import axios from "axios";
import { ref, inject } from "vue";

export default function usePatients() {
    const patients = ref({});
    const myPatient = ref({});
    const validationErrors = ref({});
    const current_page = ref(1);
    const last_page = ref();

    const swal = inject("$swal");
    const getPatients = async (page = 1) => {
        axios.get("/api/patients?page=" + page).then((res) => {
            patients.value = res.data;
            current_page.value = page;
            last_page.value = res.data.meta.last_page;
     
            
        });
    };
    const getPatient = async (patient_id) => {
        axios.get("/api/patients/" + patient_id).then((response) => {
            console.log('hello patient');
            console.log(patient_id);
            myPatient.value = response.data.data;
        });
    };

    const storePatients = async (patient) => {
        axios
            .post("/api/patients", patient)
            .then((response) => {
                swal({
                    icon: "success",
                    title: localStorage.getItem('userLanguage') == 'en' ? "Patient has been saved successfully" : "Le patient a été enregistré avec succès",
                });
                getPatients();
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response?.data.errors;
                }
            });
    };

    const updatePatient = async (patient) => {

        axios
            .put("/api/patients/" + patient.id, patient)
            .then((response) => {
                swal({
                    icon: "success",
                    title:  localStorage.getItem('userLanguage') == 'en' ? "Patient has been edited successfully" : "Le patient a été enregistré avec succès",
                });

                getPatients();
     
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response?.data.errors;
                }
            });
    };
    const searchPatients = async (item) => {
        axios
            .get("/api/search/patients?searching=" + item)
            .then((response) => {
                patients.value = response.data;
            })
            .catch((error) => console.log(error));
    };
    const deletePatient = async (patient) => {

        swal({
            title: localStorage.getItem('userLanguage') == 'en' ? "Are you sure you wanna delete this patient ?" : "Voulez-vous vraiment supprimer ce patient ?" ,
            text: localStorage.getItem('userLanguage') == 'en' ? "Patient's appointments and all his informations won't be restored !" : "Les rendez-vous du patient et toutes ses informations ne seront pas restaurés !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#499167",
            cancelButtonColor: "#E97777",
            confirmButtonText: localStorage.getItem('userLanguage') == 'en' ? "Yes, delete it!" : "Oui, supprimez!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete("/api/patients/" + patient)
                    .then((response) => {
                        swal.fire(
                            localStorage.getItem('userLanguage') == 'en' ?"Deleted !": "Supprimé",
                            localStorage.getItem('userLanguage') == 'en' ? "Patient has been deleted." : "Le patient a été supprimé.",
                            "success"
                        );
                    });
                getPatients();
            }
        });
    };


    

    return {
        getPatients,
        patients,
        myPatient,
        getPatient,
        storePatients,
        updatePatient,
        searchPatients,
        deletePatient,
        current_page,
        last_page,
    };
}
