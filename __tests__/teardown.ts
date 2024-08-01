module.exports = async () => {
  // Access the client that was stored globally
  const client = (global as any).__MONGO_CLIENT__;
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};
