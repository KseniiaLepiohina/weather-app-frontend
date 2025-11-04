import { MemoryRouter } from "react-router-dom";
import WeatherApp from "../WeatherApp";

test("render city and country",async()=> {
  const data = {
    dt:1627812000,
    name:'Kyiv',
    sys:{country:"UA"},
    weather:[{icon:"01d", description:"clear sky", main:"Clear"}],
    main:{temp:20, humidity:55},
    wind:{speed:3}
  };

  jest.mock("axios",()=> ({
    get:jest.fn(()=> Promise.resolve({data:data}))
  }));
  renderMatches(
    <MemoryRouter initialEntries={[{state:{lat:50,lng:30}}]}>
      <WeatherApp/>
    </MemoryRouter>
  );
  expect(await screen.findByText("Kyiv")).toBeInTheDocument();
  expect(await screen.findByText("UA")).toBeInTheDocument();
});