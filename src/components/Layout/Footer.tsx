
const Footer = () => {
    return (
        <footer className="bg-primary py-12">
            <div className="container mx-auto">
                <p className=" text-center">
                    Copyright &copy; Pratik Sharma 🤍 {(new Date()).getFullYear()}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;