import { useTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Typography,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import "./Auth.css";
import { getErrorMsgs } from "@/utils/helpers";
import muApi from "@/server/muApi";
import useAppStore from "@/store/appStore";

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();

  const { setToken, setUser } = useAppStore();

  const [formData, setFormData] = useState({
    username: userData ? userData.username : "",
    password: "",
  });

  const [cooldown, setCooldown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username.trim())
      newErrors.username = t("Username is required");

    if (!formData.password) {
      newErrors.password = t("Password is required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // To Handle refresh scenario of Cooldown timer
  useEffect(() => {
    const cooldownEnd = localStorage.getItem("cooldownEnd");
    if (cooldownEnd) {
      const remaining = Math.floor((+cooldownEnd - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(true);
        setSecondsLeft(remaining);
      } else {
        localStorage.removeItem("cooldownEnd");
      }
    }
  }, []);
  
  // Cooldown timer
  useEffect(() => {
    let timer;
    if (cooldown && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            localStorage.removeItem("cooldownEnd");
            setCooldown(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown, secondsLeft]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    if (validateForm()) {
      setLoading(true);

      try {
        const res = await muApi.post("/User/login", {
          username: formData.username,
          password: formData.password,
        });

        const token = await res?.data?.token;
        const user = await res?.data?.user;

        setToken(token);
        setUser(user);

        if (user?.roles?.includes("SuperAdmin")) {
          navigate({
            pathname: "/MU/dashboard",
          });
        } else {
          navigate({
            pathname: "/",
          });
        }
      } catch (error) {
        // console.log(error);
        const status = error?.response?.status;

        if (status === 429) {
          const end = Date.now() + 60 * 1000;
          localStorage.setItem("cooldownEnd", end);
          setCooldown(true);
          setSecondsLeft(60);
        }

        if (error?.response?.data) {
          if (error?.response?.data?.message) {
            setErrors({
              username: t(error?.response?.data?.message),
              password: true,
            });
          } else {
            setErrors({
              ...getErrorMsgs(error),
            });
          }
        }
      }

      setLoading(false);
    }
  };

  return (
    <section
      className="auth-page-bg"
      style={{ backgroundImage: 'url("/images/menofia-university.jpeg")' }}
    >
      <div className="auth-form min-w-[300px] sm:min-w-[400px] py-12 px-8 sm:py-16 sm:px-12">
        {cooldown ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <Typography variant="h5" fontWeight="bold" className="text-danger">
              {t("Too many login attempts")}
            </Typography>

            <Typography variant="body1" className="text-gray-600">
              {t("Please wait")}{" "}
              <span className="text-danger font-semibold">{secondsLeft}s</span>{" "}
              {t("before trying again")}
            </Typography>

            <Typography variant="caption" className="text-gray-500">
              {t("This is a security measure to protect your account")}
            </Typography>
          </div>
        ) : (
          <>
            <Typography
              variant="h5"
              fontWeight="bold"
              marginBottom={3}
              className="text-primary"
            >
              {t("Login")}
            </Typography>

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              {/* Email Input */}
              <div>
                <FormLabel
                  htmlFor="username"
                  className="flex mb-2"
                  sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}
                >
                  {t("Username")}
                </FormLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={t("البريد")}
                  name="البريد "
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </div>

              {/* Password Input */}
              <div>
                <FormLabel
                  htmlFor="password"
                  className="flex mb-2"
                  sx={{ textAlign: i18n.language === "ar" ? "right" : "left" }}
                >
                  {t("كلمة السر")}
                </FormLabel>

                <div className="relative">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="********"
                    type={!isPassVisible ? "password" : "text"}
                    name="كلمة السر"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    error={!!errors.password}
                    helperText={
                      typeof errors.password === "string" ? errors.password : ""
                    }
                  />

                  <button
                    type="button"
                    className="absolute top-0 bottom-0 w-12 h-full flex-center z-20"
                    style={i18n.language === "ar" ? { left: 0 } : { right: 0 }}
                    onClick={() => setIsPassVisible(!isPassVisible)}
                  >
                    {!isPassVisible ? (
                      <VisibilityIcon fontSize="medium" />
                    ) : (
                      <VisibilityOffIcon fontSize="medium" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <Link to="/reset-password" className="flex text-danger">
                {t("نسيت كلمة السر؟")}
              </Link>

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 1 }}
                disabled={loading}
                className="!bg-primary"
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    color="inherit"
                    className="m-auto"
                  />
                ) : (
                  t("الدخول")
                )}
              </Button>
            </form>

            {/* Register Link */}
            <div className="flex flex-wrap gap-x-2 mt-4">
              {t("لا تملك حساب ؟")}
              <Link to="/register">
                <span className="text-danger">{t("Register now")}</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LoginPage;
