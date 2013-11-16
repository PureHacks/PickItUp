#include <wiringPi.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>



	int gr_delay = 10;

	int segmentPins[7] = {

	    3,
		5,
		7,
		8,
		10,
		11,
		12
	};

	int segmentsInNumber[11][7] = {
		 {1,1,1,1,1,1,0},
		 {0,1,1,0,0,0,0},
		 {1,1,0,1,1,0,1},
 		 {1,1,1,1,0,0,1},
		 {0,1,1,0,0,1,1},
		 {1,0,1,1,0,1,1},
		 {1,0,1,1,1,1,1},
		 {1,1,1,0,0,0,0},
		 {1,1,1,1,1,1,1},
		 {1,1,1,1,0,1,1},
		 {0,0,0,0,0,0,0}
	};

	int digitPins[2] = {13,15};



int show_number(int number, int delay_millis, int num_pos) {


	int pos = 0;
	int value;
	int num_cycles;
	int k;


	num_cycles = delay_millis/(gr_delay*num_pos);

	for (k= 0; k<=num_cycles-1; k++) {	
	
		value = number;

		pos = 0;

		while (value > 0) {

			int digit =  value % 10;


			hide_all_except(pos);	


			show_digit(pos, digit);

			delay(gr_delay);


		 	value /= 10;

			pos ++;
		}

	}

}




int show_digit(int pos, int digit){

    
    int i;

	pinMode(digitPins[pos], OUTPUT);
	digitalWrite(digitPins[pos], HIGH);
	
	for(i=0; i <= sizeof(segmentPins)/sizeof(segmentPins[0]) -1; i++ ) {


		pinMode(segmentPins[i], OUTPUT);
		digitalWrite(segmentPins[i], segmentsInNumber[digit][i]);
	}



}


int clear_all() {

	int i;
	for(i = 0; i <= sizeof(digitPins)/sizeof(digitPins[0]) - 1; i++) {

		show_digit(i,10);

	}
}


int hide_all() {

	int i;
	for(i = 0; i <= sizeof(digitPins)/sizeof(digitPins[0]) - 1; i++) {
			
		pinMode(digitPins[i], OUTPUT);
		digitalWrite(digitPins[i], LOW);

	}
}

int hide_all_except(int pos) {

	int i;

	for(i = 0; i <= sizeof(digitPins)/sizeof(digitPins[0]) - 1; i++) {
			
		if(i != pos)  {
			pinMode(digitPins[i], OUTPUT);
			digitalWrite(digitPins[i], LOW);
		}
	}
}



int main(int argc, char *argv[])  {

	int number;
	int disp_interval;
	int num_pos;


	if(argc < 3) {
	 	printf("Usage: output_number NUMBER DELAY(ms)\n");
		exit(1);
	}

	number = atoi(argv[1]);
	disp_interval = atoi(argv[2]);
	num_pos = strlen(argv[1]);	

	int num_phys_pos = sizeof(digitPins)/sizeof(digitPins[0]);

	if(num_pos > num_phys_pos) {
	 	printf("Only %d numeric positions currently supported\n", num_phys_pos);
		exit(1);
	}

    wiringPiSetupPhys();

	clear_all();

	show_number(number, disp_interval, num_pos);

	clear_all();

	hide_all();

	return 0;
}