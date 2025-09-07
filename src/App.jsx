import "./App.css";
import {
  FormControl,
  InputGroup,
  Container,
  Button,
  Card,
  Row,
} from "react-bootstrap";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [recipes, setRecipes] = useState([]);

  async function search() {
    if (!searchInput) return;

    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&number=12&addRecipeInformation=true&apiKey=${API_KEY}`
    );
    const data = await res.json();
    setRecipes(data.results || []);
  }

  return (
    <>
      <Container style={{ textAlign: "center", marginTop: "30px" }}>
        <h1 style={{ fontWeight: "bold", marginBottom: "10px" }}>
          🍳 Recipe Finder
        </h1>
        <p style={{ fontSize: "18px", color: "#555", marginBottom: "25px" }}>
          Search delicious recipes by ingredient (e.g., <b>paneer</b>,{" "}
          <b>tomato</b>). Discover new dishes and get full cooking instructions.
        </p>

        <InputGroup style={{ justifyContent: "center", marginBottom: "30px" }}>
          <FormControl
            placeholder="Enter an ingredient..."
            type="input"
            aria-label="Search for recipes"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
            style={{
              width: "300px",
              height: "40px",
              borderRadius: "5px",
              paddingLeft: "10px",
            }}
          />
          <Button onClick={search} style={{ marginLeft: "10px" }}>
            Search
          </Button>
        </InputGroup>
      </Container>

      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          {recipes.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                style={{
                  width: "18rem",
                  backgroundColor: "white",
                  margin: "10px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <Card.Img
                  variant="top"
                  src={recipe.image}
                  style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginBottom: "10px",
                    }}
                  >
                    {recipe.title}
                  </Card.Title>
                  <Button
                    href={recipe.sourceUrl}
                    target="_blank"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "15px",
                      borderRadius: "5px",
                      padding: "8px 12px",
                    }}
                  >
                    View Recipe
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default App;
