import { nanoid } from "nanoid";
import URL from "../models/url.js";

export const handleGenerateNewShortURL = async (req, res) => {
  const data = req.body;
  if (!data.url) {
    return res.status(400).json({ message: "URL is required" });
  }
  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: data.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.status(200).render("home", { id: shortID });
};

export const handleShortUrl = async (req, res) => {
  const shortId = req.params.id;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  if (!entry) {
    return res.status(404).json({ message: "Short URL not found" });
  }

  return res.status(200).redirect(entry.redirectURL);
};

export const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.id;
  const entry = await URL.findOne({ shortId });
  if (!entry) {
    return res.status(404).json({ message: "Short URL not found" });
  }

  return res.status(200).json({
    msg: `Request Successful for ${shortId}`,
    TotalClicks: entry.visitHistory.length,
  });
};

export const handleHtmlRender = async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  if (req.user.role === "ADMIN") {
    const allRecords = await URL.find({});
    return res.render("home", {
      urlRecords: allRecords,
    });
  }
  const records = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urlRecords: records,
  });
};
