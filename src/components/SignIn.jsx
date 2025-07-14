// import {
//   TextField,
//   Button,
//   Typography,
//   FormLabel,
//   CircularProgress,
// } from "@mui/material";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { useEffect, useState } from "react";

// const LoginPage = () => {
//   const [isPassVisible, setIsPassVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
//   const userData = location.state;
//   const navigate = useNavigate();


//   const [formData, setFormData] = useState({
//     username: userData ? userData.username : "",
//     password: "",
//   });

//   const [cooldown, setCooldown] = useState(false);
//   const [secondsLeft, setSecondsLeft] = useState(60);

//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     let newErrors = {};

//     if (!formData.username.trim())
//       newErrors.username = ("Username is required");

//     if (!formData.password) {
//       newErrors.password = ("Password is required");
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // To Handle refresh scenario of Cooldown timer
//   useEffect(() => {
//     const cooldownEnd = localStorage.getItem("cooldownEnd");
//     if (cooldownEnd) {
//       const remaining = Math.floor((+cooldownEnd - Date.now()) / 1000);
//       if (remaining > 0) {
//         setCooldown(true);
//         setSecondsLeft(remaining);
//       } else {
//         localStorage.removeItem("cooldownEnd");
//       }
//     }
//   }, []);
  
//   // Cooldown timer
//   useEffect(() => {
//     let timer;
//     if (cooldown && secondsLeft > 0) {
//       timer = setInterval(() => {
//         setSecondsLeft((prev) => {
//           if (prev <= 1) {
//             localStorage.removeItem("cooldownEnd");
//             setCooldown(false);
//             return 60;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [cooldown, secondsLeft]);

//  const onSubmit = async (e) => {
//   e.preventDefault();

//   setErrors({});

//   if (validateForm()) {
//     setLoading(true);

//     try {
//       const res = await fetch("http://193.227.24.29:5000/api/Account/Login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userName: formData.username,
//           password: formData.password,
//         }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         const status = res.status;

//         if (status === 429) {
//           const end = Date.now() + 60 * 1000;
//           localStorage.setItem("cooldownEnd", end);
//           setCooldown(true);
//           setSecondsLeft(60);
//         }

//         if (errorData?.message) {
//           setErrors({
//             username: errorData.message,
//             password: true,
//           });
//         } else {
//           setErrors({
//            username: errorData?.errors?.UserName,
//           });
//         }

//         setLoading(false);
//         return;
//       }

//       const data = await res.json();
//       const token = data?.token;
//       // const user = data?.user;
//       // console.log(data)

//           // localStorage.setItem("user", user);
//           localStorage.setItem("token", token);

//       if (user?.roles?.includes("SuperAdmin")) {
//         navigate({
//           pathname: "/MU/dashboard",
//         });
//       } else {
//         navigate({
//           pathname: "/",
//         });
//       }
//     } catch (error) {
//       console.error("Unexpected error:", error);
//       setErrors({ general: "An unexpected error occurred." });
//     }

//     setLoading(false);
//   }
// };


//   return (
//     <section
//       className="auth-page-bg"
//       style={{ backgroundImage: 'url("/images/menofia-university.jpeg")' }}
//     >
//       <div className="auth-form min-w-[300px] sm:min-w-[400px] py-12 px-8 sm:py-16 sm:px-12">
//         {cooldown ? (
//           <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
//             <Typography variant="h5" fontWeight="bold" className="text-danger">
//               {("Too many login attempts")}
//             </Typography>

//             <Typography variant="body1" className="text-gray-600">
//               {("Please wait")}{" "}
//               <span className="text-danger font-semibold">{secondsLeft}s</span>{" "}
//               {("before trying again")}
//             </Typography>

//             <Typography variant="caption" className="text-gray-500">
//               {("This is a security measure to protect your account")}
//             </Typography>
//           </div>
//         ) : (
//           <>
//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               marginBottom={3}
//               className="text-green-700"
//             >
//               {("Login")}
//             </Typography>

//             <form onSubmit={onSubmit} className="flex flex-col gap-3">
//               {/* Email Input */}
//               <div>
//                 <FormLabel
//                   htmlFor="username"
//                   className="flex mb-2"
//                   sx={{ textAlign: "right" }}
//                 >
//                   {("Username")}
//                 </FormLabel>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   placeholder={("Username")}
//                   name="username"
//                   value={formData.username}
//                   onChange={(e) =>
//                     setFormData({ ...formData, username: e.target.value })
//                   }
//                   error={!!errors.username || errors.UserName}
//                   helperText={errors.username || errors.UserName}
//                 />
//               </div>

//               {/* Password Input */}
//               <div>
//                 <FormLabel
//                   htmlFor="password"
//                   className="flex mb-2"
//                   sx={{ textAlign: "right" }}
//                 >
//                   {("Password")}
//                 </FormLabel>

//                 <div className="relative">
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     placeholder="********"
//                     type={!isPassVisible ? "password" : "text"}
//                     name="password"
//                     value={formData.password}
//                     onChange={(e) =>
//                       setFormData({ ...formData, password: e.target.value })
//                     }
//                     error={!!errors.password}
//                     helperText={
//                       typeof errors.password === "string" ? errors.password : ""
//                     }
//                   />

//                   <button
//                     type="button"
//                     className="absolute top-0 bottom-0 w-12 h-full flex-center z-20"
//                     style={{ left: 0 }}
//                     onClick={() => setIsPassVisible(!isPassVisible)}
//                   >
//                     {!isPassVisible ? (
//                       <VisibilityIcon fontSize="medium" />
//                     ) : (
//                       <VisibilityOffIcon fontSize="medium" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Forgot Password Link */}
//               {/* <Link to="/reset-password" className="flex text-danger">
//                 {("Forgot your password?")}
//               </Link> */}

//               {/* Login Button */}
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 1 }}
//                 disabled={loading}
//                 className="!bg-green-700"
//               >
//                 {loading ? (
//                   <CircularProgress
//                     size={24}
//                     color="inherit"
//                     className="m-auto"
//                   />
//                 ) : (
//                   ("Login")
//                 )}
//               </Button>
//             </form>

//             {/* Register Link */}
//             {/* <div className="flex flex-wrap gap-x-2 mt-4">
//               {("Don't have an account?")}
//               <Link to="/register">
//                 <span className="text-danger">{("Register now")}</span>
//               </Link>
//             </div> */}
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default LoginPage;


// import {
//   TextField,
//   Button,
//   Typography,
//   FormLabel,
//   CircularProgress,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { useEffect, useState } from "react";

// const LoginPage = () => {
//   const [isPassVisible, setIsPassVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
//   const userData = location.state;
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: userData ? userData.username : "",
//     password: "",
//   });

//   const [cooldown, setCooldown] = useState(false);
//   const [secondsLeft, setSecondsLeft] = useState(60);
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     let newErrors = {};

//     if (!formData.username.trim())
//       newErrors.username = "اسم المستخدم مطلوب";

//     if (!formData.password) {
//       newErrors.password = "كلمة السر مطلوبة";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   useEffect(() => {
//     const cooldownEnd = localStorage.getItem("cooldownEnd");
//     if (cooldownEnd) {
//       const remaining = Math.floor((+cooldownEnd - Date.now()) / 1000);
//       if (remaining > 0) {
//         setCooldown(true);
//         setSecondsLeft(remaining);
//       } else {
//         localStorage.removeItem("cooldownEnd");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     let timer;
//     if (cooldown && secondsLeft > 0) {
//       timer = setInterval(() => {
//         setSecondsLeft((prev) => {
//           if (prev <= 1) {
//             localStorage.removeItem("cooldownEnd");
//             setCooldown(false);
//             return 60;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [cooldown, secondsLeft]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     if (validateForm()) {
//       setLoading(true);

//       try {
//         const res = await fetch("http://193.227.24.29:5000/api/Account/Login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userName: formData.username,
//             password: formData.password,
//           }),
//         });

//         if (!res.ok) {
//           const errorData = await res.json();
//           const status = res.status;

//           if (status === 429) {
//             const end = Date.now() + 60 * 1000;
//             localStorage.setItem("cooldownEnd", end);
//             setCooldown(true);
//             setSecondsLeft(60);
//           }

//           if (errorData?.message) {
//             setErrors({
//               username: errorData.message,
//               password: true,
//             });
//           } else {
//             setErrors({
//               username: errorData?.errors?.UserName,
//             });
//           }

//           setLoading(false);
//           return;
//         }

//         const data = await res.json();
//         const token = data?.token;
//         const user = data?.user;

//         localStorage.setItem("token", token);

//         if (user?.roles?.includes("SuperAdmin")) {
//           navigate({ pathname: "/MU/dashboard" });
//         } else {
//           navigate({ pathname: "/" });
//         }
//       } catch (error) {
//         console.error("Unexpected error:", error);
//         setErrors({ general: "حدث خطأ غير متوقع" });
//       }

//       setLoading(false);
//     }
//   };

//   return (
//     <section
//       className="auth-page-bg"
//       style={{ backgroundImage: 'url("/images/menofia-university.jpeg")' }}
//     >
//       <div className="auth-form min-w-[300px] sm:min-w-[400px] py-12 px-8 sm:py-16 sm:px-12">
//         {cooldown ? (
//           <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
//             <Typography variant="h5" fontWeight="bold" className="text-danger">
//               عدد محاولات الدخول كبير جدًا
//             </Typography>

//             <Typography variant="body1" className="text-gray-600">
//               الرجاء الانتظار{" "}
//               <span className="text-danger font-semibold">{secondsLeft} ثانية</span>{" "}
//               قبل المحاولة مرة أخرى
//             </Typography>

//             <Typography variant="caption" className="text-gray-500">
//               هذا إجراء أمني لحماية حسابك
//             </Typography>
//           </div>
//         ) : (
//           <>
//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               marginBottom={3}
//               className="text-green-700"
//             >
//               الدخول
//             </Typography>

//             <form onSubmit={onSubmit} className="flex flex-col gap-3">
//               <div>
//                 <FormLabel htmlFor="username" className="flex mb-2" sx={{ textAlign: "right" }}>
//                   اسم المستخدم
//                 </FormLabel>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   placeholder="اسم المستخدم"
//                   name="username"
//                   value={formData.username}
//                   onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                   error={!!errors.username || errors.UserName}
//                   helperText={errors.username || errors.UserName}
//                 />
//               </div>

//               <div>
//                 <FormLabel htmlFor="password" className="flex mb-2" sx={{ textAlign: "right" }}>
//                   كلمة السر
//                 </FormLabel>

//                 <div className="relative">
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     placeholder="********"
//                     type={!isPassVisible ? "password" : "text"}
//                     name="password"
//                     value={formData.password}
//                     onChange={(e) =>
//                       setFormData({ ...formData, password: e.target.value })
//                     }
//                     error={!!errors.password}
//                     helperText={
//                       typeof errors.password === "string" ? errors.password : ""
//                     }
//                   />

//                   <button
//                     type="button"
//                     className="absolute top-0 bottom-0 w-12 h-full flex-center z-20"
//                     style={{ left: 0 }}
//                     onClick={() => setIsPassVisible(!isPassVisible)}
//                   >
//                     {!isPassVisible ? (
//                       <VisibilityIcon fontSize="medium" />
//                     ) : (
//                       <VisibilityOffIcon fontSize="medium" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 1 }}
//                 disabled={loading}
//                 className="!bg-green-700"
//               >
//                 {loading ? (
//                   <CircularProgress size={24} color="inherit" className="m-auto" />
//                 ) : (
//                   "دخول"
//                 )}
//               </Button>
//             </form>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default LoginPage;


import {
  TextField,
  Button,
  Typography,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: userData ? userData.username : "",
    password: "",
  });

  const [cooldown, setCooldown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "اسم المستخدم مطلوب";
    if (!formData.password) newErrors.password = "كلمة السر مطلوبة";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
        const res = await fetch("http://193.227.24.29:5000/api/Account/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: formData.username,
            password: formData.password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          const status = res.status;

          if (status === 429) {
            const end = Date.now() + 60 * 1000;
            localStorage.setItem("cooldownEnd", end);
            setCooldown(true);
            setSecondsLeft(60);
          }

          if (errorData?.message) {
            setErrors({ username: errorData.message, password: true });
          } else {
            setErrors({ username: errorData?.errors?.UserName });
          }

          setLoading(false);
          return;
        }
// لو البيانات مظبوطة
        const data = await res.json();
        const token = data?.token;
        const user = data?.user;

        localStorage.setItem("token", token);
          window.location.reload();


        if (user?.roles?.includes("SuperAdmin")) {
          navigate({ pathname: "/MU/dashboard" });
        } else {
          navigate({ pathname: "/" });
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setErrors({ general: "حدث خطأ غير متوقع" });
      }

      setLoading(false);
    }
  };

  return (
    <section 
      dir="rtl"
      className="auth-page-bg"
      style={{
       backgroundImage: 'url("/images/menofia-university.jpeg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "75vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
      }}
    >
      <div
        className="auth-form"
        style={{
          backgroundColor: "#fff",
          padding: "3rem 2rem",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          minWidth: "350px",
          maxWidth: "450px",
          width: "100%",
        }}
      >
        {cooldown ? (
          <div style={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight="bold" color="error">
              عدد محاولات الدخول كبير جدًا
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              الرجاء الانتظار{" "}
              <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
                {secondsLeft} ثانية
              </span>{" "}
              قبل المحاولة مرة أخرى
            </Typography>
            <Typography variant="caption" color="textSecondary">
              هذا إجراء أمني لحماية حسابك
            </Typography>
          </div>
        ) : (
          <>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              sx={{ textAlign: "center", mb: 3 }}
            >
              الدخول
            </Typography>

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              {/* Username */}
              <div>
                <FormLabel htmlFor="username" sx={{ display: "block", mb: 1 }}>
                  اسم المستخدم
                </FormLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="أدخل اسم المستخدم"
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </div>

              {/* Password */}
              <div>
                <FormLabel htmlFor="password" sx={{ display: "block", mb: 1 }}>
                  كلمة السر
                </FormLabel>
                <div style={{ position: "relative" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="********"
                    type={!isPassVisible ? "password" : "text"}
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    error={!!errors.password}
                    helperText={
                      typeof errors.password === "string"
                        ? errors.password
                        : ""
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setIsPassVisible(!isPassVisible)}
                    style={{
                      position: "absolute",
                      left: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    {!isPassVisible ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
              style={{
                 backgroundColor: '#176D6A',
            border: 'none',
            height: '45px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            width: '100%',
            color: '#eee'
              }}
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#2e7d32",
                  "&:hover": { backgroundColor: "#27632a" },
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "دخول"
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default LoginPage;
