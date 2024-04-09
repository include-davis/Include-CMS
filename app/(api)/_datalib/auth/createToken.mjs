async function createAuthToken(data) {
    const token = await this.createToken(data);
    return token;
}
