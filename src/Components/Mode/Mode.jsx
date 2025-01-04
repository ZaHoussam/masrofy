import style from "./Mode.module.css";
import dark from "../../assets/dark.svg";
import light from "../../assets/light.svg";

const Mode = ({ action }) => {
  return (
    <div className={style.dark_light_btn} onClick={action}>
      <img src={light} alt="light" />
      <img src={dark} alt="dark" />
    </div>
  );
};

export default Mode;
