import React from "react";
import Navbar from "../components/navbar";
import Banner from "../components/banner";
import ListPost from "../components/listpost";

const IdeasPage = () => {
    return (
        <div>
            <Navbar />
            <Banner
                imageUrl="https://images.unsplash.com/photo-1550418290-a8d86ad674a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                title="Ideas"
                subtitle="Where all our great things begin"
            />
            <ListPost />
        </div>
    );
};

export default IdeasPage;