import styles from "@/app/page.module.css";

export default function DarkModeButton({darkMode, setDarkMode, darkModeButtonRef}) {
    return (
        <div className={`${styles.dark_mode_button_container}`}>
        <div className={`${styles.dark_mode_button_container}`}>
          <button className={`btn ${darkMode ? "bg-secondary text-light" : "bg-dark text-light"} col-8 col-xl-12 shadow-none d-block`} id="dark_mode_button" ref={darkModeButtonRef} onClick={() => {setDarkMode(!darkMode)}}>
            Dark mode on/off
          </button>
        </div>
      </div>
    );
}