import React from "react";
import styles from "./search-form.module.css";

type Props = {
    city: string;
    setCity: (city: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchForm({ city, setCity, onSubmit }: Props) {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <input
                type="text"
                className={styles.input}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button type="submit" className={styles.button}>
                Search
            </button>
        </form>
    )
}