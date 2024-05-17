import styles from "@/app/page.module.css"

export default function TopBar({darkMode}) {
    return (
        <div className={`${styles.top_bar} ${darkMode ? styles.background_dark_gray : ""}`}>
            <h1 className={darkMode ? "text-light" : ""}>
                Weather App
            </h1>
        </div>
    )
}