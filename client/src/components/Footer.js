const Footer = () => (
<footer className="footer">
    <div className="row">
        <div class="col-sm-6 col-md-4 footer-navigation">
            <h1 className="text-white">Hotelzilla</h1>
            <p className="links"><a href="/">Home</a><strong> · </strong><a href="/login">Login</a><strong> · </strong><a href="/register">Register</a></p>
            <p className="company-name">HotelZilla © 2021 </p>
        </div>
        <div className="col-sm-6 col-md-4 footer-contacts">
            <div><span className="fa fa-map-marker footer-contacts-icon"> </span>
                <p><span className="new-line-span">3300 W Calemback Road</span>Phoenix Arizona</p>
            </div>
            <div><i className="fa fa-phone footer-contacts-icon"></i>
                <p className="footer-center-info email text-start"> +1 855 428 5673</p>
            </div>
            <div><i className="fa fa-envelope footer-contacts-icon"></i>
                <p><a href="/" target="_blank">support@hotelzilla.com</a></p>
            </div>
        </div>
        <div className="col-md-4 footer-about">
            <h4>About the company</h4>
            <p>HotelZilla is a site to book and sell hotel tooms</p>
            <div className="social-links social-icons"><a href="https://www.linkedin.com/in/cyrus-duncan-35a209198/"><i className="fa fa-linkedin"></i></a><a href="https://github.com/Duncan4264"><i className="fa fa-github"></i></a></div>
        </div>
    </div>
</footer>
)

export default Footer;
