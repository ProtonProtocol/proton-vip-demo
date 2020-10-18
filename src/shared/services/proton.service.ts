import { ConnectWallet } from '@protonprotocol/proton-web-sdk'
import { PROTON_CHAIN } from '../../constants/proton-chain.constant'
import ProtonVIPLogo from '../../proton-logo-color.png'

class ProtonSDK {
  public chainId;
  public endpoints;
  public appName;
  public requestAccount;
  public session;
  public link;
  public user;

  constructor() {
    this.chainId = PROTON_CHAIN.chainId;
    this.endpoints = PROTON_CHAIN.endpoints;
    this.appName = PROTON_CHAIN.appName;
    this.requestAccount = PROTON_CHAIN.requestAccount;
    this.session = null;
    this.link = null;
    this.user = null;
  }

  login = async () => {
    try {
      this.link = await ConnectWallet({ chainId: this.chainId, endpoints: this.endpoints }, { requestAccount: this.requestAccount }, this.appName, ProtonVIPLogo);
      const { session } = await this.link.login(this.appName);
      this.session = session;
      this.user = this._returnUserFromSession(session);
      localStorage.setItem('AUTH_USER', JSON.stringify(this.user));
      return this.user;
    } catch (e) {
      console.log("Auth error", e);
      return null;
    }
  }

  sendTransaction = async (amount) => {

    const actions = [{
      account: 'xtokens',
      name: 'transfer',
      authorization: [{
        actor: this.user.actor,
        permission: this.user.permission,
      }],
      data: {
        from: this.user.actor,
        to: this.requestAccount,
        quantity: `${amount}.000000 FOOBAR`, // note this in future docs, decimals must be 6 or transaction fails
        memo: 'ProtonVIP'
      }
    }];

    try {
      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );
      return result;
    } catch (e) {
      return e;
    }
  }

  logout = async () => {
    await this.link.removeSession(this.appName, this.session.auth);
    localStorage.removeItem('AUTH_USER');
  }

  restoreSession = async () => {
    const savedUserAuth = JSON.parse(localStorage.getItem('AUTH_USER'));
    if (savedUserAuth) {
      try {
        this.link = await ConnectWallet(
          { chainId: this.chainId, endpoints: this.endpoints },
          { requestAccount: this.requestAccount },
          this.appName,
          ProtonVIPLogo,
          false
        );
        const result = await this.link.restoreSession(this.appName, { actor: savedUserAuth.actor, permission: savedUserAuth.permission });
        if (result) {
          this.session = result;
          this.user = this._returnUserFromSession(this.session);
          return this.user;
        }
      } catch (e) {
        console.log('error', e);
        return null;
      }
    }
    return null;
  }

  _returnUserFromSession = (session) => {
    const auth = session.auth;
    const profile = session.accountData[0];
    const user = {
      actor: auth.actor,
      permission: auth.permission,
      avatar: profile.avatar,
      createdAt: profile.date,
      name: profile.name
    };
    return user;
  }

}

const protonSDK = new ProtonSDK();
export default protonSDK;
