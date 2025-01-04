<script>
  // set year
  const date = new Date().getFullYear();
  import Logo from "../lib/mylogo.png";
</script>

<footer class="footer">
  <div class="two_columns">
    <div class="logo_section">
      <a href="https://curiousdata.netlify.app/">
        Author's website <br />
        <img src={Logo} alt="logo" class="nav-logo" />
      </a>
    </div>
    <div class="github_section">
      <a
        href="https://github.com/DameAnneSo"
        target="_blank"
        class="social-icon"
      >
        Github code
        <br />
        <i class="fa-brands fa-github"></i>
      </a>
    </div>
  </div>
  <p>
    &copy; <span id="date">{date}</span> Anne-Sophie Pereira De Sá. All rights reserved
  </p>
</footer>

<style>
  .footer {
    display: grid;
    place-items: center;
    height: 12rem;
    /* margin-top: 2rem; */
    margin-bottom: 1rem;
    padding-top: 1rem;
    background-color: var(--clr-primary-2);
  }
  .footer p {
    text-transform: capitalize;
    color: var(--clr-primary-4);
  }

  .two_columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .nav-logo {
    width: 3.5rem;
  }

  .footer img {
    transition: var(--transition);
    display: block;
    margin: 0 auto;
  }

  .logo_section:hover,
  .github_section:hover {
    transform: scale(1.1);
    transition: var(--transition);
  }

  .logo_section:hover a,
  .github_section:hover a {
    color: var(--clr-primary-5);
  }

  .github_section {
    display: grid;
    place-items: center;
  }
  .fa-github {
    font-size: 3.5rem;
  }

  .footer p {
    text-transform: capitalize;
    font-size: 0.8rem;
  }

  .footer p,
  .footer a {
    color: var(--clr-primary-8);
    transition: var(--transition);
    text-align: center;
  }
</style>
