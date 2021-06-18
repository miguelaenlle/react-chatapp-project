import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    card: {
        width: 500,
        justifyContent: "center"
    },
    form : {
        width: '100%',
        marginBottom: 20
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    submissionButton: {
        marginTop: 16
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: 'black'
    },
    bottomButtons: {
        marginTop: 10
    }
}))
export default useStyles;