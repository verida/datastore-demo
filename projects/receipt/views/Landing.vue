<template>
    <div>
        <video autoplay muted class="landing" loop>
            <source src="@src/assets/video/landing.mp4" type="video/mp4">
        </video>
        <div class="landing__btn">
            <img src="@src/assets/img/verida-logo.svg" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Landing"
}
</script>