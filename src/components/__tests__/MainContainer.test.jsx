import { fireEvent, render, waitFor } from "@testing-library/react";
import store from "../../utils/store";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { SEACH_BY_CATEGORY } from "../mocks/data";
import MainContainer from "../MainContainer";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(SEACH_BY_CATEGORY)
        },
    });
});

test('Videos by category should load on the Home Page', async () => { 
        const mainContainer = render(
            <StaticRouter>
                <Provider store={store}>
                    <MainContainer />
                </Provider>
            </StaticRouter>
        );
        const btnList = mainContainer.getByTestId("btn-list")
        // console.log(btnList.children[0]);
        expect(btnList.children.length).toBe(17);
        fireEvent.click(btnList.children[1]);

        await waitFor(() => expect(mainContainer.getByTestId("home-page-videos")))
        const homePageVideos = mainContainer.getByTestId("home-page-videos")
        // console.log(homePageVideos.children.length);
        expect(homePageVideos.children.length).toBe(41);
})