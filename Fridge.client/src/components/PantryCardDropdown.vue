<template>
    <!-- <label for="cars">Choose a car:</label> -->

    <div class="container">
        <div v-if="dropDown">
            The thing is dropped down
        </div>
        <button class="btn btn-dark this-btn" @click="dropDownToggle()">
            click
        </button>
        <div class="options">
            <div>1</div>
            <div>2</div>
            <div>3</div>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue'
// import { computed } from 'vue'
import { logger } from '../utils/Logger'
// import { AppState } from '../AppState'
export default {
    props: {

    },
    setup() {
        let dropDown = ref(false)

        return {
            dropDown,
            dropDownToggle() {
                dropDown.value = !dropDown.value
            }
        }
    }
}
</script>

<style scoped>
.this-btn {
    width: 100%;
}

.container {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.options {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: 35px;
    flex-grow: 1;
    text-align: center;
    background-color: white;
    width: 100%;
    z-index: 100;
    display: none;
    opacity: 0;
}

.dropped {
    display: block !important;
    opacity: 100 !important;
}
</style>