<template>
  <section class="timeline">
		<div 
            class="timeline-block" 
            v-for="entry in timeline"
            :key="entry.id"
        >
			<div class="timeline-img">
				<img :src="entry.icon">
			</div> 
			<div class="timeline-content">
				<h2>{{entry.title}}</h2>
				<span class="timeline-date">{{entry.date}}</span>
			</div> 
		</div> 
	</section> 
</template>

<script>
import useUser from '@/components/modules/user/composables/useUser'

export default {
    setup() {
        const {timeline} = useUser()
        return {
            timeline
        }
    }
}
</script>

<style lang="scss" scoped>
.timeline {
	width: 100%;
	overflow-y: hidden;
}
.timeline {
	position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
	&::before {
		content: '';
		position: absolute;
		top: 2rem;
		left: 15%;
		height: 90%;
		width: 4px;
		background: $color-fourth;
        filter: opacity(50%);
	}
}

.timeline-block {
	position: relative;
}

.timeline-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 60px;
	height: 60px;
	border-radius: 50%;
    cursor: pointer;
    background-color: $color-third;
    animation: pulse 3s infinite;
    img {
        display: block;
		width: 40px;
		height: 40px;
		position: absolute;
        top: 50%; 
        right: 50%;
        transform: translate(50%,-50%);
    }
}
@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(21, 179, 139, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

.timeline-content {
	position: relative;
	margin-left: 70px;
	padding: 1em;

	.timeline-date {
		display: inline-block;
	}
}
</style>