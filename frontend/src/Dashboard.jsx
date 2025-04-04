import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, List, ListItem, TextField, Box } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
      fetchItems();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.trim()) return;
    try {
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newItem }),
      });
      const newItemData = await response.json();
      setItems([...items, newItemData]);
      setNewItem("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleUpdateItem = async (id, newName) => {
    try {
      await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      setItems(items.map(item =>
        item.id === id ? { ...item, name: newName } : item
      ));
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/items/${id}`, { method: "DELETE" });
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#ADB2D4", // Light background color
        padding: 2,
      }}
    >
      <Container maxWidth="md" sx={{ padding: "2rem", backgroundColor: "#fff", borderRadius: "8px", boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome, {user}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <TextField
            label="New Item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            variant="outlined"
            sx={{ marginRight: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddItem}
            sx={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              backgroundColor: "#ADB2D4",
            }}
          >
            Add Item
          </Button>
        </Box>

        <List sx={{ padding: 0 }}>
          {items.map(item => (
            <ListItem key={item.id} sx={{ marginBottom: "1rem", backgroundColor: "#fff", borderRadius: "8px", padding: "1rem" }}>
              <TextField
                value={item.name}
                onChange={(e) => handleUpdateItem(item.id, e.target.value)}
                variant="outlined"
                fullWidth
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteItem(item.id)}
                sx={{ marginLeft: 2 }}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>

        <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
          <Button
            variant="contained"
            backgroundColor="ADB2D4"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            sx={{ padding: "0.75rem 2rem", fontSize: "1rem" }}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
