import styles from "./index.module.css";
import { useRef, useImperativeHandle, forwardRef } from "react";

import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Header from "~/components/Header.tsx";
import DrawingComponent from "~/components/DrawingComponent.tsx";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

	const drawingComponentRef = useRef(null);

  const handleClear = () => {
    drawingComponentRef.current.handleClear();
  };

	const handleDownload = () => {
    drawingComponentRef.current.handleDownload();
  };

  const styles = {
    pageBlock: {
      height: "100vh",
      backgroundImage: 'url("./images/background.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
      padding: 20,
    },
    drawingArea: {
      display: "flex",
      width: "100%",
      height: "100%",
      borderWidth: "2px",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
    },
    desktopIconContainer: {
      display: "flex",
      flexDirection: "column",
      rowGap: 40,
      fontFamily: "Inter",
      fontSize: 15,
      fontWeight: 500,
    },
    desktopIconBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    desktopIcons: {
      height: 60,
      width: 60,
      cursor: "pointer",
    },
  };

  return (
    <>
      <Head>
        <title>My Ugly NFT</title>
        <meta name="description" content="Create your own NFT" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Freckle+Face&family=Inter:wght@400;500;700&family=Rubik+Iso&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main style={styles.pageBlock}>
        <Header></Header>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={styles.drawingArea}>
            <DrawingComponent ref={drawingComponentRef} />
          </div>

          <div
            style={styles.desktopIconContainer}
          >
            <div style={styles.desktopIconBox}>
              <img
                src="./images/disk-card.png"
                style={styles.desktopIcons}
								onClick={handleDownload}
              ></img>
              <span>Download</span>
            </div>
            <div style={styles.desktopIconBox}>
              <img src="./images/trash.png" style={styles.desktopIcons} onClick={handleClear}></img>
              <span>Delete</span>
            </div>
            <div style={styles.desktopIconBox}>
              <img
                src="./images/retro-pc.png"
                style={styles.desktopIcons}
              ></img>
              <span>Compute</span>
            </div>
          </div>
        </div>
        {/* <div className={styles.showcaseContainer}>
						<p className={styles.showcaseText}>
						{hello.data ? hello.data.greeting : "Loading tRPC query..."}
						</p>
						<AuthShowcase />
					</div> */}
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className={styles.authContainer}>
      <p className={styles.showcaseText}>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className={styles.loginButton}
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
