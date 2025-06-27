// import { Button } from "bootstrap"
// import { Link } from "react-router-dom"
// // import { useNavigate } from "react-router-dom"

//  const BackToMenu = () => {
//     // const navigate = useNavigate();
//     return(
//         <Link to='/' className='btn btn-info' style={{margin: '0 auto',
//             display: 'block',
//             width: '230px',
//             height: '50px',
//             paddingTop: '10px'}}>العودة إلى الصفحة الرئيسية</Link>
             
//     )
// }

// export default BackToMenu

import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button"; // لو كنت تستخدم PrimeReact بدلاً من Bootstrap

const BackToMenu = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');                // التنقل
    setTimeout(() => {
      window.location.reload();   // إعادة تحميل الصفحة بعد الرجوع
    }, 100); // تأخير بسيط لتجنب التعارض
  };

  return (
    <button onClick={handleBack} className="btn btn-info" style={{
      margin: '0 auto',
      display: 'block',
      width: '230px',
      height: '50px',
      paddingTop: '10px'
    }}>
      العودة إلى الصفحة الرئيسية
    </button>
  );
};

export default BackToMenu;
