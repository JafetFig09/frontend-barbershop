import {generateClasses} from '@formkit/themes'
const config = {

    config:{
        classes: generateClasses({
            global:{
                wrapper: 'mb-3',
                message:'text-danger text-uppercase',
                label:'form-label',
                input:'form-control',
                span:'d-none'

            },
            submit:{
                input:'btn btn-success'
            }
        })

    },
    
}

export default config