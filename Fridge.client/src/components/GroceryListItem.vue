<template>
    <div class="list-card p-2 m-2 d-flex flex-row justify-content-between">
        <div>
            <h3>
                {{ foodItem.name }}
            </h3>
            <p>
                Pantry: {{ foodItem.quantity }}
            </p>
        </div>
        <div class="qty">
            <h3>
                x{{ foodItem.shoppingQty }}
            </h3>
        </div>
    </div>
</template>
  
<script>
import { FoodItem } from '../models/FoodItem'
  export default {
    props:{
        foodItem: {type: FoodItem, required: true}
    },
    setup() {
      return {
  
      }
    }
  }
</script>

<style scoped>
p{
    padding: 0;
    margin: 0.25rem 0;
}
h3{
    font-family: 'Oswald', sans-serif;
    font-weight: 600;
    padding: 0;
    margin: 0;
}
.list-card{
    background-color: white;
    border-radius: 2rem;
}
.qty{
    height: inherit;
    justify-content: center;
    align-items: center;
    display: flex;
}
</style>