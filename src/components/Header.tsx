import { React } from 'react';
import { format } from 'date-fns';


const Header = () => {
    const styles = {
        headerContainer: {
            width: "100%",
            borderStyle: 'solid',
            borderWidth: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F2ECDC',
            // borderRadius: 15,
            borderWidth: 3,
            boxShadow: '7px 7px',
            padding: 5,
            borderRadius: 5
        },
        logoContainer: {
            backgroundColor: '#2c3e50',
            display: 'flex',
        },
        title: {
            display: 'flex',
            fontFamily: 'Rubik Iso',
            fontSize: 30,
            fontWeight: 600,
            alignSelf: 'flex-end',
            margin: 5
        },
        date: {
            display: 'flex',
            fontSize: 15,
            fontWeight: 'bold',
            margin: 5,
            marginRight: 20,
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: 12
        }
    }

    const date = format(new Date(), 'ccc LLL dd hh:mm a')

    return (
        <div style={styles.headerContainer}>
           {/* <div style={styles.logoContainer}>
                <p>Logo</p>
           </div> */}
            <span style={styles.title}>My - Ugly - NFT</span>
            <span style={styles.date}>{date}</span>
        </div>
    );
};

export default Header;