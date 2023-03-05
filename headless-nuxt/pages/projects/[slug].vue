<template>
  <section class="project">
    <div class="project__info" v-if="project">
      <div class="project__info__header">
        <div class="project-img">
          <img :src="project.image.url" alt="">
          <div class="test">
            <h1>{{ project.name }}</h1>

          </div>

        </div>
      </div>

      <div class="project__info__links">
        <div v-if="project.link">
          <a :href="project.link" target="_blank" class="btn">Lien du site</a>
        </div>
        <div v-if="project.youtube_link">
          <a :href="project.youtube_link" target="_blank" class="btn">Démo vidéo</a>
        </div>
        <div v-if="project.github_link">
          <a :href="project.github_link" target="_blank" class="btn">Github</a>
        </div>

        <NuxtLink to="/" class="btn-primary">Retour</NuxtLink>
      </div>

      <div class="project__info__details">
          <p>{{ project.description }}</p>
      </div>

      <div class="project__info__language">
        <h2>Langages et Technos utilisés</h2>
        <div class="list-lang">
          <div class="language-card" v-for="language in project.language">
            <div class="language-card-image">
              <img :src="language.image.url" alt="">
            </div>
            <div class="language-card-desc">
              <p>{{ language.name}}</p>
            </div>
          </div>
        </div>

      </div>





    </div>

  </section>
</template>


<script setup>

const { findOne } = useStrapi()
const route = useRoute()
const project = ref()

onMounted( async () => {
  project.value = await findOne(`projects?filters[slug]=${route.params.slug}&populate=deep`)
  project.value = project.value.data[0]
})
</script>

<style>
@import "../scss/style.css";


</style>