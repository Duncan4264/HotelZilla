const Footer = () => (
<footer>
    <div class="row">
        <div class="col-sm-6 col-md-4 footer-navigation">
            <h1 className="text-white">Hotelzilla</h1>
            <p class="links"><a href="/">Home</a><strong> · </strong><a href="/login">Login</a><strong> · </strong><a href="/register">Register</a></p>
            <p class="company-name">HotelZilla © 2021 </p>
        </div>
        <div class="col-sm-6 col-md-4 footer-contacts">
            <div><span class="fa fa-map-marker footer-contacts-icon"> </span>
                <p><span class="new-line-span">3300 W Calemback Road</span>Phoenix Arizona</p>
            </div>
            <div><i class="fa fa-phone footer-contacts-icon"></i>
                <p class="footer-center-info email text-start"> +1 855 428 5673</p>
            </div>
            <div><i class="fa fa-envelope footer-contacts-icon"></i>
                <p><a href="#" target="_blank">support@hotelzilla.com</a></p>
            </div>
        </div>
        <div class="col-md-4 footer-about">
            <h4>About the company</h4>
            <p>HotelZilla is a site to book and sell hotel tooms</p>
            <div class="social-links social-icons"><a href="https://www.linkedin.com/in/cyrus-duncan-35a209198/"><i class="fa fa-linkedin"></i></a><a href="https://github.com/Duncan4264"><i class="fa fa-github"></i></a></div>
        </div>
    </div>
</footer>
)

export default Footer;
