import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      api: '',
      userName: '',
      loading: true,
      showProfile: true,
      hideBtn: true,
      render: true,
    };

    this.changeDataJson = this.changeDataJson.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getInfosFromLocalStorage = this.getInfosFromLocalStorage.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.getLogout = this.getLogout.bind(this);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { userName } = this.state;
    if (prevState.userName.length < userName.length) {
      localStorage.setItem('@User', userName);
    }
  }

  componentWillUnmount() {
    /* eslint-disable no-alert */
    alert('Você ocultou seu perfil');
    /* eslint-disable no-alert */
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { userName } = this.state;
    const myUser = userName; // Preencha myUser com o seu user do GitHub.
    try {
      const url = `https://api.github.com/users/${myUser}`;
      const response = await fetch(url);
      const dataJson = await response.json();
      this.changeDataJson(dataJson);
      this.setState({ loading: false, hideBtn: false, render: true });
    } catch (error) {
      console.log(error);
    }
    const { confirmIfLogin } = this.props;
    confirmIfLogin(true);
  }

  getInfosFromLocalStorage() {
    const { userName } = this.state;
    if (userName.length === 0 && localStorage.getItem('@User') !== null) {
      this.setState({
        userName: localStorage.getItem('@User'),
        api: JSON.parse(localStorage.getItem('@User%pi')),
        loading: false,
        hideBtn: false,
      });
    }
  }

  getLogout() {
    localStorage.removeItem('@User');
    localStorage.removeItem('@User%pi');
    this.setState({
      render: false,
      hideBtn: true,
      api: '',
      userName: '',
    });
    window.location.reload();
  }

  changeProfile() {
    const { showProfile } = this.state;
    this.setState({ showProfile: !showProfile });
  }

  btnHidden() {
    return (
      <div className="central d-flex justify-content-center">
        <button
          className="btn btn-dark align-self-center"
          type="button"
          onClick={ this.changeProfile }
        >
          Mostrar / Ocultar Perfil
        </button>
      </div>
    );
  }

  card() {
    const { api: { name, email, bio, location, login } = '', api } = this.state;
    return (
      <div
        className="d-flex h-100 flex-column
        justify-content-center align-items-center"
        id="divCardUser"
      >
        <h1>{ name }</h1>
        <a href={ api.html_url }>{ login }</a>
        <span>{ email }</span>
        <img className="myPicture" src={ api.avatar_url } alt="Avatar" />
        <p>{ bio }</p>
        <p>{ location }</p>
      </div>
    );
  }

  returnLogoutBtn() {
    return (
      <div className="central d-flex justify-content-center">
        <button
          className="btn btn-dark align-self-center"
          type="button"
          onClick={ this.getLogout }
        >
          Logout
        </button>
      </div>
    );
  }

  changeDataJson(dataJson) {
    this.setState({ api: dataJson });
    localStorage.setItem('@User%pi', JSON.stringify(dataJson));
  }

  render() {
    const { api, loading, showProfile, hideBtn, render } = this.state;
    this.getInfosFromLocalStorage();
    const loginUser = (
      <div className="form">
        <form className="input-group justify-content-center">
          <input
            className="form-control"
            type="text"
            name="userName"
            onChange={ this.handleChange }
            placeholder="Digite seu nome usuário"
          />
          <button
            className="btn btn-outline-dark"
            type="button"
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
    const conditionCardInfo = loading ? <p>Loading...</p> : this.card();
    const teste = render ? (
      <div>
        { showProfile ? conditionCardInfo : null }
      </div>
    ) : null;
    return (
      <section>
        <div
          className="git d-flex flex-column
          justify-content-center align-items-center"
          id="returnDiv"
        >
          { teste }
          { api ? null : loginUser }
        </div>
        <div>
          { hideBtn ? null : this.btnHidden() }
          { hideBtn ? null : this.returnLogoutBtn() }
        </div>
      </section>
    );
  }
}

Profile.propTypes = {
  confirmIfLogin: PropTypes.func.isRequired,
};

export default Profile;
