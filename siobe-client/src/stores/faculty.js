import axiosClient from '@/lib/axios'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const csrf = () => axiosClient.get('/sanctum/csrf-cookie')

export const useFaculties = defineStore('faculty', {
    state: () => ({
        allFaculty: [],
        showFaculty: [],
        updateFaculty: null,
    }),

    getters: {
        getAllFaculty(state) {
            return state.allFaculty
        },
        getShowFaculty(state) {
            return state.showFaculty
        },
    },

    actions: {
        fetchAllFaculty() {
            axiosClient
                .get('//127.0.0.1:8000/api/faculties')
                .then(response => {
                    // console.log(response.data)
                    this.allFaculty = response.data.data
                })
                .catch(error => {
                    this.allFaculty= error
                })
        },

        createFaculty(name) {
            axiosClient
                .post('//127.0.0.1:8000/api/faculties/', {
                    name: name,
                })
                .then(response => {
                    console.log(response.status)
                    window.location.href = '/faculty'
                    this.createFaculty = response.status

                })
                .catch(error => {
                    console.log(error.response)
                    this.createFaculty = error.response.status
                })
        },

        fetchRubricWithId(id) {
            axios
                .get('//127.0.0.1:8000/api/faculties/' + id)
                .then(response => {
                    console.log(response.data)
                    this.showFaculty = response.data.data
                })
                .catch(error => {
                    this.showFaculty = error
                })
        },

        updateFaculty(facultyId, name) {
            axiosClient
                .put('//127.0.0.1:8000/api/faculties/' + facultyId, {
                    name: name,
                })
                .then(response => {
                    console.log(response.status)
                    this.createFaculty = response.status
                })
                .catch(error => {
                    console.log(error.response)
                    this.createFaculty = error.response.status
                })
        },
    },
})
