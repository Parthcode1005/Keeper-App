const express = require("express");
const mongoose = require("mongoose");
const cores = require("cors");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cores());
mongoose.connect("mongodb://127.0.0.1:27017/keeperDb", {
  useNewUrlParser: true,
});

const keeperSchema = {
  title: String,
  content: String,
};

const Keeper = mongoose.model("keeper", keeperSchema);

app.get("/api", async (req, res) => {
  let result = await Keeper.find({});
  return res.send(result);
});
app.post("/api/addNew", async (req, res) => {
  const query = new Keeper({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
  });
  await query.save();
  return res.send("Successfully added new Note");
});
app.patch("/api/update/:id", async (req, res) => {
  await Keeper.updateOne(
    { _id: (req.params.id) },
    { $set: req.body },

  );
  res.send("Patched succesfully");
});

// app.put("api/:id", (req, res) => {
//   Keeper.update(
//     { _id: mongoose.Types.ObjectId(req.params.id) },
//     { title: req.body.title, content: req.body.content },
//     { overwrite: true },
//     (err) => {
//       if (!err) {
//         res.send("Patched succesfully");
//       }
//     }
//   );
// });

app.delete("/api/delete/:id", async (req, res) => {
  await Keeper.deleteOne(
    { _id: (req.params.id) },
    { $set: req.body },
  );
  res.send("successfully deleted");
});
app.listen(8000, () => {
  console.log("Backend connected");
});
