/**
 * Model for tokens used by Zoho Oauth
 */
class Token {
  constructor(data) {
    this.data = data;
  }

  /**
   * Check if the token has no data in it
   *
   * @returns {boolean}
   */
  empty() {
    if (!this.data) {
      return true;
    }

    return false;
  }

  /**
   * Check if the token expired, based on it's Time To Live and the
   * creation date.
   *
   * @returns {boolean}
   */
  expired() {
    const expiresInTime = new Date(this.data.expires_in);
    const now = new Date();
    const diffTime = Math.abs(now - expiresInTime - 5);

    if (diffTime > 0) {
      return true;
    }

    return false;
  }

  /**
   * Get the access token
   *
   * @returns {string}
   */
  accessToken() {
    return this.data.access_token;
  }
}

module.exports = Token;
