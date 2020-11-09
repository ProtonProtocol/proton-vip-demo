import { ConnectWallet } from '@protonprotocol/proton-web-sdk';
import { PROTON_CHAIN } from '../constants/proton-chain.constant';
import ProtonVIPLogo from '../../util/proton-logo-color.png';
import firebaseService from './firebase.service';
import Link, { LinkSession } from '@protonprotocol/proton-link';
import { User } from '../providers/AuthProvider';

class ProtonSDK {
  public chainId;
  public endpoints;
  public appName;
  public requestAccount;
  public session: LinkSession | null;
  public link?: Link | null;
  public user: User;

  constructor() {
    this.chainId = PROTON_CHAIN.chainId;
    this.endpoints = PROTON_CHAIN.endpoints;
    this.appName = PROTON_CHAIN.appName;
    this.requestAccount = PROTON_CHAIN.requestAccount;
    this.session = null;
    this.link = null;
    this.user = {
      actor: '',
      permission: '',
      avatar: '',
      createdAt: new Date(),
      name: '',
      isMember: false,
      memberLevel: '',
    };
  }

  connect = async (restoreSession=false, showSelector=true) => {
    const { link, session } = await ConnectWallet({
      linkOptions: { chainId: this.chainId, endpoints: this.endpoints, restoreSession },
      transportOptions: {
        requestAccount: this.requestAccount,
        backButton: true,
      },
      selectorOptions: { appName: this.appName, appLogo: ProtonVIPLogo, showSelector },
    });
    this.link = link;
    this.session = session;
    return session;
  }

  login = async () => {
    try {
      const session = await this.connect();
      this.user = this._returnUserFromSession(session);
      return this.user;
    } catch (e) {
      console.warn('Auth error', e);
      return null;
    }
  };

  sendTransaction = async (amount: number, level: string) => {
    const actions = [
      {
        account: 'xtokens',
        name: 'transfer',
        authorization: [
          {
            actor: this.user.actor,
            permission: this.user.permission,
          },
        ],
        data: {
          from: this.user.actor,
          to: this.requestAccount,
          quantity: `${amount}.000000 FOOBAR`,
          memo: 'ProtonVIP',
        },
      },
    ];

    try {
      if (!this.session) {
        return;
      }
      const result = await this.session.transact(
        { actions: actions },
        { broadcast: true }
      );
      await firebaseService.collection('members').add({
        user: this.user.actor,
        level,
      });

      return result;
    } catch (e) {
      return e;
    }
  };

  logout = async () => {
    if (!this.session && !this.link) {
      return;
    }

    await this.link!.removeSession(this.appName, this.session!.auth);
    localStorage.removeItem('AUTH_USER_PROTON_VIP');
  };

  restoreSession = async () => {
    const token: string = localStorage.getItem('AUTH_USER_PROTON_VIP') || '';
    const savedUserAuth = JSON.parse(token);
    if (savedUserAuth) {
      try {
        const session = await this.connect(true, false);
        if (session) {
          this.user = this._returnUserFromSession(this.session);
          return this.user;
        }
      } catch (e) {
        console.warn('Session Restoration Error:', e);
        return null;
      }
    }
    return null;
  };

  _returnUserFromSession = (session: any) => {
    const auth = session.auth;
    const profile = session.accountData[0];
    const user = {
      actor: auth.actor,
      permission: auth.permission,
      avatar: profile.avatar,
      createdAt: profile.date,
      name: profile.name,
    };
    return user;
  };
}

const ProtonService = new ProtonSDK();
export default ProtonService;
