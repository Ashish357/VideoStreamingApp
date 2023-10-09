import { fireEvent, render, waitFor } from "@testing-library/react";
import VideoContainer from "../VideoContainer";
import store from "../../utils/store";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { SEACH_BY_CATEGORY, YOUTUBE_DATA_BY_API, YOUTUBE_HOME_PAGE_DATA, YOUTUBE_VIDEO_COMMENT } from "../mocks/data";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(YOUTUBE_HOME_PAGE_DATA)
        },
    });
});

test('Shimmer should load on Home Page', () => { 
        const videoConatiner = render(
            <StaticRouter>
                <Provider store={store}>
                    <VideoContainer />
                </Provider>
            </StaticRouter>
        );
        // console.log(videoConatiner);
        const shimmer = videoConatiner.getByTestId("shimmer")
        // console.log(shimmer.children.length);
        expect(shimmer.children.length).toBe(50);
})

test('Videos should load on Home Page', async () => { 
        const videoContainer = render(
            <StaticRouter>
                <Provider store={store}>
                    <VideoContainer />
                </Provider>
            </StaticRouter>
        );
        await waitFor(() => expect(videoContainer.getByTestId("home-page-videos")))
        const homePageVideos = videoContainer.getByTestId("home-page-videos")
        //console.log(homePageVideos.children.length);
        expect(homePageVideos.children.length).toBe(50);
})

test('Watch page should load on clicking a video', async () => { 
    const videoContainer = render(
        <BrowserRouter>
            <Provider store={store}>
                <VideoContainer />
            </Provider>
        </BrowserRouter>
    );
    await waitFor(() => expect(videoContainer.getByTestId("home-page-videos")))
    const homePageVideos = videoContainer.getByTestId("home-page-videos")
    // console.log(homePageVideos.children[0]);
    fireEvent.click(homePageVideos.children[0]);
    await waitFor(()=> expect(window.location.pathname).toBe('/watch'))
})



