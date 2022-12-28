// Manage UI

class UI{
    constructor(){
        // All the parameters
        this.timezone = document.getElementById('w-location');
        this.description = document.getElementById('w-desc');
        this.temperature = document.getElementById('w-string');
        this.icon_image = document.getElementById('w-icon');

        this.humidity = document.getElementById('w-humidity');
        this.dewpoint = document.getElementById('w-dewpoint');
        this.windSpeed = document.getElementById('w-wind');

        // for pressing buttons
        this.change_location = document.querySelector('#chooselocation'); 
        this.save_changes = document.querySelector('#w-change-btn');
    }


    // Clear last results
    clearResult(){

    }

    // Set new results
    showResults(currently, timezone){
        
        this.timezone.innerHTML = timezone;

        this.description.innerHTML = currently.summary
        this.temperature.innerHTML = currently.temperature + ' tzelzius';
        // this.icon_image.src = currently.icon; // !!

        this.humidity.innerHTML = 'Relative Humidity: ' + currently.humidity;
        this.dewpoint.innerHTML = 'dewPoint: ' 
        + currently.dewPoint;
        this.windSpeed.innerHTML = 'windSpeed: ' + currently.windSpeed;



        


    }

    // clearAlert
    clearAlert(){
        const alerts = document.querySelector('.alert');

        if(alerts){
            alerts.remove();
        }
    }

    async showAlert(msg, className, callback){

        //clear all alerts before
        this.clearAlert();

        const div = document.createElement('div');
        div.className = className;

        div.appendChild(document.createTextNode(msg));

        const modal = document.querySelector('.modal-body');
        const form = document.getElementById('w-form');

        //insert alert
        modal.insertBefore(div,form);

        // callback();
        

        // Clear element after 3 seconds
        // setTimeout(div.remove(),3000);


        
        
    }
}