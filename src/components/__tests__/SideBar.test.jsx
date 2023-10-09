import { fireEvent, render, waitFor } from "@testing-library/react";
import store from "../../utils/store";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import SideBar from "../SideBar";
import { BrowserRouter } from "react-router-dom";

test('On clicking the search input Search Result page should load', async () => {
  const sidebar = render(
    <StaticRouter>
      <Provider store={store}>
        <SideBar />
      </Provider>
    </StaticRouter>
  );
//   console.log(sidebar);
    const sideBar = sidebar.getByTestId("sidebar");
    expect(sideBar.children.length).toBe(1);

    const sidebar1 = sidebar.getByTestId("sidebar-1");
    // console.log(sidebar1.children[0].textContent);

    expect(sidebar1.children[0].textContent).toBe(" Home")
    expect(sidebar1.children[1].textContent).toBe("Shorts")
    expect(sidebar1.children[2].textContent).toBe("Subscription")

    expect(sidebar1.children.length).toBe(3)

    const sidebar2 = sidebar.getByTestId("sidebar-2");
    // console.log(sidebar1.children.length);
    expect(sidebar2.children.length).toBe(5)

    const sidebar3 = sidebar.getByTestId("sidebar-3");
    // console.log(sidebar1.children.length);
    expect(sidebar3.children.length).toBe(7)
})

test('Sidebar links', async () => {
  const sidebar = render(
    <BrowserRouter>
      <Provider store={store}>
        <SideBar />
      </Provider>
    </BrowserRouter>
  );

  const sidebar1 = sidebar.getByTestId("sidebar-1");
    fireEvent.click(sidebar1.children[0])
    expect(window.location.pathname).toBe("/")
   
    fireEvent.click(sidebar1.children[1])
    expect(window.location.pathname).toBe("/results")

})


  
  