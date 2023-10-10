'use client'
import Link from 'next/link'
import styles from './navbar.module.css'
import { useEffect, useRef, useState } from 'react'

import { API_KEY } from '@/utils/urls'

export default function Navbar() {
    const searchInputRef = useRef(null);
    const firstResultLinkRef = useRef(null);

    const [search, setSearch] = useState('');
    const [data, setData] = useState([]); // Initialize data as an empty array

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === '/') {
                e.preventDefault();
                searchInputRef.current.focus();
            } else if (e.key === 'Enter' && data.length > 0) {
                e.preventDefault();
                // Check if firstResultLinkRef is not null before clicking
                if (firstResultLinkRef.current) {
                    firstResultLinkRef.current.click();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [data]);


    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleClearSearch = () => {
        setSearch('');
        setData([]);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${search}`);

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const responseData = await res.json();
                setData(responseData);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        if (search.trim() !== '') {
            fetchData();
        }
    }, [search]);



    return (
        <div>
            <div className={styles.navContainer}>
                <nav className={styles.navbar}>

                    <h1 className={styles.head}>Weather Forecast</h1>

                    <div className={styles.searchContainer}>

                        <input
                            type="text"
                            placeholder="Search for location"
                            value={search}
                            onChange={handleInputChange}
                            ref={searchInputRef}
                        />

                        {search && ( // Only render the button when search has a value
                            <button className={styles.clearIcon} onClick={handleClearSearch}></button>
                        )}
                        <button className={styles.searchIcon}></button>
                    </div>
                </nav>

            </div>
            <div className={styles.linksContainer}>
                <ul className={styles.quickLinks}>
                    {data.map((item, index) => (
                        <li key={item.id}>
                            <Link
                                key={item.id}
                                ref={index === 0 ? firstResultLinkRef : null} // Set the ref for the first result link
                                href={{
                                    pathname: `/city/${item.url}`,
                                    query: { cityName: item.name }, // Pass item.name as a query parameter
                                }}
                                className={styles.link}
                                onClick={() => {
                                    handleClearSearch(); // Clear the search bar and hide search options
                                }}
                            >
                                <div>
                                    <h2 className={styles.city}>{item.name}</h2>
                                    <p className={styles.country}>
                                        {item.region && (
                                            <span>{item.region}{", "}</span>
                                        )}
                                        {item.country && (
                                            <span>{item.country}</span>
                                        )}
                                    </p>
                                </div>
                                <div className={styles.locationIcon}></div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}