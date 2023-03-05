<template>
  <header class="header" id="header">
    <div class="container header__container">

      <div class="header__container__intro">
        <h4 class="subtitle-dark">Bonjour, je m'appelle </h4>
        <h1 class="flicker">Me<span class="flicker-fast">hd</span>i <span class="flicker-long">AL</span> SID CHEI<span class="flicker-fast">KH</span></h1>
        <h2 class="text-light">
          et je suis <span> Développeur Front-End</span>
        </h2>
      </div>

      <div class="header__container__window">
        <div class="me">
          <img src="~/assets/me-before.png" alt="Photo Mehdi" class="pic"/>
        </div>
        <a href="#contact" class="scroll__down">Scrollez vers le bas</a>
      </div>


    </div>

  </header>

  <section id="about" class="section">

    <div class="section__title">
      <h5>Qui suis-je ?</h5>
      <h2>À propos</h2>
    </div>


    <div class="container about__container">
      <div class="about__me">
        <div class="about__me-image">
          <img src="~/assets/me-now.jpg" alt="Image à propos"/>
        </div>
      </div>

      <div class="about__content">
        <div class="about__cards" >
          <article class="about__card">
            <h5>Status</h5>
            <div class="about__card__desc">
              <small>Étudiant Alternant</small>
            </div>
          </article>

          <article class="about__card">
            <h5>Expérience</h5>
            <div class="about__card__desc">
              <small>2 stages en Dev Web + Alternance de Dev Web en cours</small>
            </div>
          </article>

          <article class="about__card">
            <h5>Études</h5>
            <div class="about__card__desc">
              <small>4 années post-bac en Informatique/Dev Web</small>
            </div>
          </article>
        </div>
        <p>Depuis que je suis petit, j'ai toujours été fasciné par l'Informatique. Cependant, ce domaine est très vaste, mais c'est lorsque j'ai effectué un DUT Informatique que j'ai découvert le Développement Web. Depuis, j'ai développé une passion pour ce domaine, notamment pour le Front-End. Mon rêve et mon objectif sont de devenir un développeur Front-End capable de réaliser plus attractifs et plus impressionnant les uns que les autres!</p>
        <a href="#contact" class='btn btn-primary'>Me contacter</a>
      </div>
    </div>
  </section>


  <section id="portfolio" class="section">
    <div class="section__title">
      <h5>Mes travaux récents</h5>
      <h2>Projets</h2>
    </div>

    <div v-if="projects">
      <div class="filter">
        <h3>Filtrer :</h3>
        <div class="filter__list">
          <button @click="filterProjects('all')" class="btn-primary">Tout</button>
          <button :class="{'btn':true, 'active': activeFilter === type}"
                  v-for="type in types" @click="filterProjects(type)"> {{ type }}</button>
        </div>
      </div>

      <div class="container portfolio__container">
        <nuxt-link :to="`/projects/${project.slug}`" v-for="project in filteredProjects" class="portfolio__item">
          <div class="portfolio__item-image">
            <img :src="project.image.url" alt="Image projet">
          </div>
          <div class="portfolio__item-desc">
            <h3>{{project.name}}</h3>
            <p>{{project.description}}</p>

            <div class="portfolio__item-language">
              <h6> Techno(s) : </h6>
              <div class="language__list" v-for="language in project.language">
                <h6>{{ language.name}}</h6>
              </div>
            </div>

            <br/>
          </div>
          <div class="portfolio__item-cta">
            <!--          <a href="" class="btn" target="_blank" rel="noreferrer">Voir projet</a>-->
          </div>
        </nuxt-link>

      </div>



    </div>
  </section>

  <section id="contact" class="section">
    <div class="section__title">
      <h5>Restons en contact</h5>
      <h2>Contactez-moi</h2>
    </div>

    <div class="container contact__container">
      <div class="contact__options">
        <article class="contact__option" ref={contactCard1}>
          <h4>Email</h4>
          <h5>mehdialsidcheikh@gmail.com</h5>
          <a class="link-text" href="mailto:mehdialsidcheikh@gmail.com" target="_blank" rel="noreferrer">Envoyer un mail</a>
        </article>

        <article class="contact__option" ref={contactCard2}>
          <h4>WhatsApp</h4>
          <h5>06 44 00 13 62</h5>
          <a class="link-text" href="https://wa.me/33644001362" target="_blank" rel="noreferrer">Envoyer un message</a>
        </article>
      </div>

    </div>
  </section>








</template>

<script setup>

const { find } = useStrapi()

const projects = ref()

const types = ref([])

const languagesTypes = ref([])

const activeFilter = ref('all')
console.log(projects)

const filterProjects = (type) => {
  activeFilter.value = type
}

const filterLanguages = (languagesTypes) => {
  activeFilter.value = languagesTypes
}


const filteredProjects = computed(() =>{
  if(activeFilter.value === "all") return projects.value.data
  return projects.value.data.filter(project => project.type === activeFilter.value)
})

const filteredLanguages = computed(() =>{
  if(activeFilter.value === "all") return projects.value.data
  return projects.value.data.filter(project => project.languagesTypes === activeFilter.value)
})

function sort(type) {
  console.log(type)
  filterType = type;
}



onMounted(async () => {
  projects.value = await find('projects', {
    populate: 'deep',
    sort: {date : "DESC"}
  })
  types.value = new Set(projects.value.data.map(project =>{
    return project.type
  }))
})
</script>

<style>
@import "scss/style.css";


</style>