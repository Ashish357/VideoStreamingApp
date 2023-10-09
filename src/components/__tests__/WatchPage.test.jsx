import { fireEvent, render, waitFor } from "@testing-library/react";
import VideoContainer from "../VideoContainer";
import store from "../../utils/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import WatchPage from "../WatchPage";
import { CHANNEL_DATA, SEACH_BY_CATEGORY, YOUTUBE_HOME_PAGE_DATA, YOUTUBE_VIDEO_BY_ID_API, YOUTUBE_VIDEO_COMMENT } from "../mocks/data";

global.fetch = jest
  .fn()
  .mockResolvedValueOnce({
    json: async () => YOUTUBE_VIDEO_BY_ID_API,
  })
  .mockResolvedValueOnce({
    json: async () => YOUTUBE_VIDEO_COMMENT,
  })
  .mockResolvedValueOnce({
    json: async () => CHANNEL_DATA,
  })
  .mockResolvedValueOnce({
    // json: async () => SEACH_BY_CATEGORY,
     json: async () => ({ items: [] }),
  })
  ;

test('Watch page should load video', async () => {
    const videoContainer = render(
        <BrowserRouter>
            <Provider store={store}>
                {/* <VideoContainer /> */}
                <WatchPage />
            </Provider>
        </BrowserRouter>
    );
    // await waitFor(() => expect(videoContainer.getByTestId("home-page-videos")));
    // const homePageVideos = videoContainer.getByTestId("home-page-videos");

    // //   Click on the first video in the list.
    // fireEvent.click(homePageVideos.children);

    // Wait for the iframe to be rendered.
    await waitFor(() => expect(videoContainer.getByTestId("iframe")));

    // Check that the iframe has the correct src attribute.
    const iframe = videoContainer.getByTestId("iframe");
    expect(iframe.src).toBe("https://www.youtube.com/embed/RPpmw6p1bMM?autoplay=1&mute=0");

    await waitFor(() => expect(videoContainer.getByTestId("metadata")))
    const metadata = videoContainer.getByTestId("metadata");
    // console.log(metadata.children[0].textContent);
    expect(metadata.children[0].textContent).toBe("India vs Nepal | Men's Cricket | 1st Innings Highlights | Hangzhou 2022 Asian Games")

    await waitFor(() => expect(videoContainer.getAllByTestId("comments")));
    const comments = videoContainer.getByTestId("comment");
    // console.log(comments.children.length)
    expect(comments.children.length).toBe(5);

    const showChat = videoContainer.getByTestId("show-chat");
    fireEvent.click(showChat)

    await waitFor(() => expect(videoContainer.getAllByTestId('chats')));

    await waitFor(() => expect(videoContainer.getByTestId("show-chat")))
    // Verify that the search results are present
    const liveChat = videoContainer.getAllByTestId('chats');
    // console.log(liveChat[0].children[0].src);
    expect(liveChat[0].children[0].src).toBe("https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png");

    const liveChatForm = videoContainer.getByTestId("live-chat-form")
    // console.log(liveChatForm.children[0].children.length);
    expect(liveChatForm.children[0].children.length).toBe(2)

    const liveChatBtn = videoContainer.getByTestId("live-chat-btn")
    const liveChatInput = videoContainer.getByTestId("live-chat-input")
    fireEvent.change(liveChatInput,{
        target:{
            value:"Hi",
        },
    });
    fireEvent.click(liveChatBtn)
    // const messages = videoContainer.getByTestId("live-chats")
    // console.log(messages.children.length);
    // console.log(liveChat[0].children[2].textContent);
    expect(liveChat[0].children[2].textContent).toBe("Hi")

//     await waitFor(() => expect(videoContainer.getAllByTestId('related-videos')));

//     // Verify that the search results are present
//     const relatedVideos = videoContainer.getAllByTestId('related-videos');
//     expect(relatedVideos).toHaveLength(49);
});
