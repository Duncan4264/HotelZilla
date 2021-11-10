import TopMenuNav from '../components/TopMenuNav';
import Dashboard from '../user/Dashboard';
import App from '../App';

describe("testing rendering/redirecting of App components when NOT authenticated", () => {
    // to apply before all tests
    beforeAll(() => {
      // mocking global fetch method
      global.fetch = jest.fn();
      
      // mocking window.alert method as it is not implemented
      window.alert = jest.fn(() => {});
    });
    
    let wrapper;
    beforeEach(async () => {
      // eslint-disable-next-line no-undef
      wrapper = mount(<App />);
                      
      // spying on verifyAuthentication function of current wrapper's node's class instance
      const spyComponentMount = jest.spyOn(wrapper.instance(), "verifyAuthentication");
      
      // returning a false resolve, ie user is NOT authenticated
      fetch.mockImplementation(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve(false);
          }
        });
      });
      
      // calling componentDidMount function, leading to verifyAuthentication call
      await wrapper.instance().componentDidMount();
      wrapper.update();
      
      // test for checking whether verifyAuthentication called within componentDidMount.
      expect(spyComponentMount).toHaveBeenCalled();
      
      // state isAuthenticated should set to false
      expect(wrapper.state("isAuthenticated")).toEqual(false);
    });
    
    afterEach(() => {
      // clears mock statuses of fetch and alert at end of each test
      fetch.mockClear();
      window.alert.mockClear();
      
      // unmounts test Component to mimic mount unmount cycle
      wrapper.unmount();
    });
    
    test("renders login page upon unsuccessful authentication", async () => {
      
      // should NOT display Home as not authenticated
      expect(wrapper.find(Dashboard)).toHaveLength(1);
      
      // should always display NavBar
      expect(wrapper.find(TopMenuNav)).toHaveLength(1);
    });
    
    test("Correctly updating HTML based on valid login", async () => {
      //const loginSpyComponentMount = jest.spyOn(wrapper.instance(), "handleLogin");
      
      // mocking a valid login fetch call to /api/login
      fetch.mockImplementationOnce(() => {
        return Promise.resolve({
          status: 200
        });
      });
      
      // entering user credentials in relevant textBoxes
      wrapper.find("#usernameInput").simulate('change', {target: {value:'sampleUsername'}});
      wrapper.find("#passwordInput").simulate('change', {target: {value:'samplePass'}});
      
      // clicking Log in button
      await wrapper.find("#authenticateButton").simulate('click');
      wrapper.update();
      
      // ensuring correct HTML change based on correct login, i.e. we expect a re-direct message
      let authenticatedDiv = (<div>
                                Authenticated. Redirecting to home.
                              </div>);
      expect(wrapper.contains(authenticatedDiv)).toBe(true);
      let incorrectDiv = (<div>
                            Incorrect credentials
                          </div>);
      expect(wrapper.contains(incorrectDiv)).toBe(false);
    });
  });