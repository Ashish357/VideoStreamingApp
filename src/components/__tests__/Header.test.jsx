import { fireEvent,getByTestId, render, screen, waitFor,queryByTestId } from "@testing-library/react"
import { Provider } from "react-redux"
import {StaticRouter} from 'react-router-dom/server'
import Header from "../Header"
import store from "../../utils/store"
import { YOUTUBE_LOGO } from "../../utils/constants"
import Search from "../Search"
import { SUGGESTIONS_DATA } from "../mocks/data"
import { BrowserRouter } from "react-router-dom"
import SideBar from "../SideBar"

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(SUGGESTIONS_DATA)
        },
    });
});

test('Logo should load on rendering data', () => { 
    const header = render(
        <StaticRouter>
            <Provider store={store}>
                <Header/>
            </Provider>
        </StaticRouter>
    );
    // console.log(header);
    const logo = header.getByTestId('logo');
    // console.log(logo);
    // console.log(logo[0]);
    expect(logo.src).toBe(YOUTUBE_LOGO)
 })

test('SideBar should toggle on clickiing menuicon', async () => { 
    const header = render(
        <StaticRouter>
            <Provider store={store}> 
                <Header/>
                <SideBar/>
            </Provider>
        </StaticRouter>
    );
    const menuIcon = header.getByTestId('sidebar-toggle');
    fireEvent.click(menuIcon)
    // const sidebar1 = await waitFor(() => screen.getByTestId('sidebar'));//give error as click will hide sidebar
    fireEvent.click(menuIcon)
    const sidebar = await waitFor(() => screen.getByTestId('sidebar'));
    // console.log(sidebar);
 })

test('Search input should show Suggestions', async () => { 
    const search = render(
        <StaticRouter>
            <Provider store={store}>
                {/* <Header /> */}
                <Search />
                {/* <SearchSuggestions /> */}
            </Provider>
        </StaticRouter>
    );
    // console.log(search);
    await waitFor(()=> expect(search.getByTestId('search-input')));
    const input = search.getByTestId('search-input');
    fireEvent.change(input,{
        target:{
            value:"india",
        },
    });
    fireEvent.focus(input)
    // await waitFor(()=> expect(search.getByTestId('sugg-list')));
    await waitFor(()=> expect(search.getAllByTestId('list-item'))); //make showSuggestion true in search component
    // console.log(input);
    // const suggList = search.getByTestId('sugg-list')
    const suggList = search.getAllByTestId('list-item')
    // console.log(suggList.length);
    expect(suggList.length).toBe(10)
    fireEvent.blur(input);
 })

test('On Clicking the search input', async () => { 
    const search = render(
        <BrowserRouter>
            <Provider store={store}>
                <Search />
                {/* <SearchResult /> */}
            </Provider>
        </BrowserRouter>
    );
    // console.log(search);
    await waitFor(()=> expect(search.getAllByTestId('search-btn')));
    // await waitFor(()=> expect(search.getByTestId('search-input')));
    const input = search.getByTestId('search-input');
    fireEvent.change(input,{
        target:{
            value:"india",
        },
    });
    // console.log(input);
    const btn = search.getByTestId('search-btn');
    fireEvent.click(btn)
    
    await waitFor(() => expect(window.location.pathname).toBe('/results'));
 })

