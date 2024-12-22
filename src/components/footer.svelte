<script>
  // set year
  const date = new Date().getFullYear();
  import Logo from '../lib/mylogo.png';
</script>

<footer class="footer">
  <a href="https://curiousdata.netlify.app/">
    <img src={Logo} alt="logo" class="nav-logo" />
    <br />
    Go to the author's website
  </a>
  <p>
    &copy; <span id="date">{date}</span> Anne-Sophie Pereira De Sá. All rights reserved
  </p>
</footer>

<style>
  .nav-logo {
    width: 3.5rem;
  }
  .footer {
    display: grid;
    place-items: center;
    height: 12rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-top: 1rem;
    background-color: var(--clr-primary-2);
  }

  .footer img {
    transition: var(--transition);
    display: block;
    margin: 0 auto;
  }

  .footer:hover img {
    transform: scale(1.2);
  }

  .footer:hover a {
    color: var(--clr-primary-5);
  }

  .footer p {
    text-transform: capitalize;
    font-size: 0.8rem;
  }

  .footer p,
  .footer a {
    color: var(--clr-primary-10);
    transition: var(--transition);
    text-align: center;
  }

  .footer p {
    text-transform: capitalize;
    color: var(--clr-primary-4);
  }
</style>
