const pageWrapping = {
  padding: '130px'
};
/**
 * @description Method to render page not found
 * @author Cyrus Duncan
 * @date 22/11/2021
 */
const PageNotFound = () => (
  <div
    class="page-wrap d-flex flex-row align-items-center"
    style={pageWrapping}
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12 text-center">
          <span class="display-1 d-block">404</span>
          <div class="mb-4 lead">
            The page you are looking for was not found.
          </div>
          <a href="/" class="btn btn-link ">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default PageNotFound;
