import logo from '../assets/react.webp'
function Header() {
  return (
    <header className='app-header'>
      <img src={logo} alt='React logo' />
      <h1>The React Quiz</h1>
    </header>
  );
}

export default Header;
