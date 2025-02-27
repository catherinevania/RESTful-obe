import { createWebHistory, createRouter } from 'vue-router'
import { useUsers } from '@/stores/user'
import Welcome from '@/pages/Welcome.vue'
import PageNotFound from '@/pages/errors/404.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import ForgotPassword from '@/pages/auth/ForgotPassword.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'
import VerifyEmail from '@/pages/auth/VerifyEmail.vue'
import Faculty from '@/pages/Faculty.vue'
import CreateFaculty from '@/pages/CreateFaculty.vue'
import UpdateFaculty from '@/pages/UpdateFaculty.vue'
import AssignmentDetail from '@/pages/AssignmentDetails.vue'
import Llo from '@/pages/Llo.vue'
import CreateLlo from '@/pages/CreateLLO.vue'
import UpdateLlo from '@/pages/UpdateLLO.vue'
import CreateAssignment from '@/pages/CreateAssignment.vue'
import Assignment from '@/pages/Assignment.vue'
import UpdateAssignment from '@/pages/UpdateAssignment.vue'

const APP_NAME = import.meta.env.VITE_APP_NAME

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome,
        meta: {
            title: 'Welcome',
            metaTags: [
                {
                    name: 'Welcome',
                    content:
                        'An application / authentication starter kit frontend in Vue.js 3 for Laravel Breeze.',
                },
                {
                    property: 'og:Welcome',
                    content:
                        'An application / authentication starter kit frontend in Vue.js 3 for Laravel Breeze.',
                },
            ],
        },
    },
    {
        path: '/home',
        redirect: '/dashboard',
        component: Dashboard,
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        // meta: {
        //     title: 'Dashboard',
        //     guard: 'auth',
        // },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        query: {
            reset: 'reset',
        },
        meta: {
            title: 'Log in',
            guard: 'guest',
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: 'Register',
            guard: 'guest',
        },
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            title: 'Forget Password',
            guard: 'guest',
        },
    },
    {
        path: '/password-reset/:token',
        name: 'password-reset',
        component: ResetPassword,
        query: {
            email: 'email',
        },
        meta: {
            title: 'Reset Password',
            guard: 'guest',
        },
    },
    {
        path: '/verify-email',
        name: 'verify-email',
        component: VerifyEmail,
        query: {
            resend: 'resend',
        },
        meta: {
            title: 'Email Verification',
            guard: 'auth',
        },
    },
    {
        path: '/page-not-found',
        name: 'page-not-found',
        component: PageNotFound,
        meta: {
            title: 'Page Not Found',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/page-not-found',
    },
    {
        path: '/faculty',
        name: 'faculty',
        component: Faculty,
        query: {
            resend: 'resend',
        },
        // meta: {
        //     title: 'Email Verification',
        //     guard: 'auth',
        // },
    },
    {
        path: '/create-faculty',
        name: 'create faculty',
        component: CreateFaculty,
        query: {
            resend: 'resend',
        },
        // meta: {
        //     title: 'Email Verification',
        //     guard: 'auth',
        // },
    },
    {
        path: '/update-faculty/:id',
        name: 'update faculty',
        component: UpdateFaculty,
        query: {
            resend: 'resend',
        },
        // meta: {
        //     title: 'Email Verification',
        //     guard: 'auth',
        // },
    },
    {
        path: '/llo',
        name: 'llo',
        component: Llo,
        query: {
            resend: 'resend',
        },
    },
    {
        path: '/create-llo',
        name: 'Create Llo',
        component: CreateLlo,
        query: {
            resend: 'resend',
        },
    },
    {
        path: '/update-llo/:id',
        name: 'Update Llo',
        component: UpdateLlo,
        query: {
            resend: 'resend',
        },
    },


    {
        path: '/create-assignment',
        name: 'Create Assignment',
        component: CreateAssignment,
        query: {
            resend: 'resend',
        },
    },
    {
        path: '/update-assignment/:id',
        name: 'Update Assignment',
        component: UpdateAssignment,
        query: {
            resend: 'resend',
        },
    },
    {
        path: '/detail-assignment/:id',
        name: 'Detail Assignment',
        component: AssignmentDetail,
        query: {
            resend: 'resend',
        },
    },
    {
        path: '/assignment',
        name: 'Assignment',
        component: Assignment,
        query: {
            resend: 'resend',


        },
        meta: {
            title: 'Assignment',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Navigation guard

router.beforeEach((to, from, next) => {
    const store = useUsers()

    const auth = store.authUser

    if (to.matched.some(route => route.meta.guard === 'guest') && auth)
        next({ name: 'dashboard' })
    else if (to.matched.some(route => route.meta.guard === 'auth') && !auth)
        next({ name: 'login' })
    else next()
})

// Page Title and Metadata

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.title)

    const nearestWithMeta = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.metaTags)

    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title + ' - ' + APP_NAME
    } else {
        document.title = APP_NAME
    }

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
        el => el.parentNode.removeChild(el),
    )

    if (!nearestWithMeta) return next()

    nearestWithMeta.meta.metaTags
        .map(tagDef => {
            const tag = document.createElement('meta')

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key])
            })

            tag.setAttribute('data-vue-router-controlled', '')

            return tag
        })

        .forEach(tag => document.head.appendChild(tag))

    next()
})

export default router
