import buildClient from "@/api/build-client";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

import App, { AppContext, AppProps } from "next/app";
import { Toaster } from "react-hot-toast";



type AppOwnProps = { data?: any };



const AppComponent  = ({ Component, pageProps, data}: AppProps & AppOwnProps) => {
  console.log(data)
  return (
    <>
      <Toaster />
      <Navbar currentUser={data?.currentUser}/>
      <Component {...pageProps} currentUser={data?.currentUser||null} />
    </>
  );
}

AppComponent.getInitialProps = async (appContext: AppContext) => {
  const ctx = await App.getInitialProps(appContext);
  if(appContext.ctx.req){
    const resp = await buildClient({req:appContext.ctx.req}).get("/api/users/currentuser")
    return {
      ...ctx,
      data: resp.data
  
    }
  }

  return {
    ...ctx,

  }

};



export default AppComponent