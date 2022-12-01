<template>
    <div>
        <ul>
            <li v-for="font in fontClasses" @click.stop="setClass({fontClass: font.class})">
                <span>{{font.sign}}</span>
                <span>{{font.family}}</span>
            </li>
        </ul>

        <ul>
            <li v-for="theme in themeClasses" @click.stop="setClass({themeClass: theme.class})">
                <span>{{theme.class}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {

    data() {
        return {
            classState: {
                fontClass: '',
                themeClass: ''
            },
            fontClasses: [
                {sign: 'Aa', family: 'System', class: 'f-system'},
                {sign: 'Ss', family: 'Fancy', class: 'f-fancy'},
                {sign: '00', family: 'Mono', class: 'f-mono'},
                {sign: 'Rr', family: 'Round', class: 'f-round'},
                {sign: 'Ff', family: 'Fun', class: 'f-fun'},
                {sign: 'Pr', family: 'Pro', class: 'f-pro'},
                {sign: 'Cc', family: 'Cool', class: 'f-cool'},
                {sign: 'At', family: 'Old', class: 'f-old'},
            ],

            themeClasses: [
                {color: [], class: 'theme-1'},
                {color: [], class: 'theme-2'},
                {color: [], class: 'theme-3'},
                {color: [], class: 'theme-4'},
                {color: [], class: 'theme-5'},
                {color: [], class: 'theme-6'},
            ]
        }
    },

    methods: {

        setClass(classType) {
            this.classState.fontClass = (classType.fontClass) ? classType.fontClass : this.classState.fontClass
            this.classState.themeClass = (classType.themeClass) ? classType.themeClass : this.classState.themeClass
            this.$emit('themeChanged',)
            document.body.className = `${this.classState.fontClass} ${this.classState.themeClass}`
        }
    }
}
</script>

