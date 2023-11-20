<template>
  <q-layout view="hHh lpR fF2">
    <q-page class="main-page">
      <div clas="q-mt-md">
        <q-form>
          <q-stepper v-model="step" ref="stepper" active-color="stepActive" done-color="stepActive" class="my-stepper"
            done-icon="fa-solid fa-check" contracted flat animated>
            <q-step :name="1" icon="fa-solid fa-1" :done="step > 1" class="q-px-lg">
              <p class="q-mb-none q-mt-sm" style="font-size: 18px; font-weight: bold;">Detail Korban</p>
              <!-- <q-icon class="q-mt-md" name="img:icons/dinamic-maps.png" style="width: 100%; height: 180px;" /> -->
              <P class="b1 q-mb-none q-mt-md">Total Korban Anak (0 - 16 Tahun)</P>
              <q-input outlined v-model="totalChild" placeholder="" color="admin-primary"
                :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              <P class="b1 q-mb-none q-mt-sm">Total Korban Dewasa (17 - 59 Tahun)</P>
              <q-input outlined v-model="totalAdults" placeholder="" color="admin-primary"
                :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              <P class="b1 q-mb-none q-mt-sm">Total Korban Lanjut Usia (>60 Tahun)</P>
              <q-input outlined v-model="totalEldery" placeholder="" color="admin-primary"
                :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              <P class="b1 q-mb-none q-mt-sm">Total Korban Hamil</P>
              <q-input outlined v-model="totalPregnancy" placeholder="" color="admin-primary"
                :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
            </q-step>

            <q-step :name="2" icon="fa-solid fa-2" :done="step > 2" class="q-px-lg">
              <p class="q-mb-none q-mt-sm" style="font-size: 18px; font-weight: bold;">Detail Kondisi Korban</p>
              <!-- <q-icon class="q-mt-md" name="img:icons/dinamic-maps.png" style="width: 100%; height: 180px;" /> -->
              <P class="b1 q-mb-none q-mt-md">Total Korban Meninggal</P>
              <q-input outlined v-model="totalDeathBody" placeholder="" color="admin-primary" 
                :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              <P class="b1 q-mb-none q-mt-sm">Total Korban Cedera Berat</P>
              <q-input outlined v-model="totalMajorInjury" placeholder="" color="admin-primary" 
                :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              <P class="b1 q-mb-none q-mt-sm">Total Korban Cedera Ringan</P>
              <q-input outlined v-model="totalMinorInjury" placeholder="" color="admin-primary" 
                :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              <P class="b1 q-mb-none q-mt-sm">Total Korban Hilang</P>
              <q-input outlined v-model="totalLost" placeholder="" color="admin-primary"
                :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
              <P class="b1 q-mb-none q-mt-sm">Total Korban Terevakuasi</P>
              <q-input outlined v-model ="totalEvacuated" placeholder="" color="admin-primary" 
                :rules="[val => (val && val.length > 0) || 'Masukkan Data']" />
            </q-step>

            <q-step :name="3" icon="fa-solid fa-3" :done="step > 3" class="q-px-lg">
              <p class="q-mb-none q-mt-sm" style="font-size: 18px; font-weight: bold;">Detail Total Kerusakan</p>
              <!-- <q-icon class="q-mt-md" name="img:icons/dinamic-maps.png" style="width: 100%; height: 180px;" /> -->
              <p class="b1 q-mb-none q-mt-md">Kerusakan Rumah</p>
              <div class="row justify-between q-mt-sm">
                <q-input class="col-8" outlined v-model="majorDamage" color="stepActive" readonly />
                <q-input class="col-3" outlined v-model="majorNumber" color="stepActive"
                  :rules="[val => (val && val.length > 0) || '']" />
              </div>
              <div class="row justify-between q-mt-sm">
                <q-input class="col-8" outlined v-model="mediumDamage" color="stepActive" readonly />
                <q-input class="col-3" outlined v-model="mediumNumber" color="stepActive"
                  :rules="[val => (val && val.length > 0) || '']" />
              </div>
              <div class="row justify-between q-mt-sm">
                <q-input class="col-8" outlined v-model="minorDamage" color="stepActive" readonly />
                <q-input class="col-3" outlined v-model="minorNumber" color="stepActive"
                  :rules="[val => (val && val.length > 0) || '']" />
              </div>
              <div class="row justify-between q-mt-sm">
                <q-input class="col-8" outlined v-model="Flooded" color="stepActive" readonly />
                <q-input class="col-3" outlined v-model="floodedNumber" color="stepActive"
                  :rules="[val => (val && val.length > 0) || '']" />
              </div>
              <p class="b1 q-mb-none q-mt-md">Kerusakan Fasilitas Umum</p>
              <div class="row justify-between q-mt-sm">
                <q-input class="col-8" outlined v-model="shcoolFacilities" color="stepActive" readonly />
                <q-input class="col-3" outlined v-model="schoolNumber" color="stepActive"
                  :rules="[val => (val && val.length > 0) || '']" />
              </div>
              <div class="row justify-between q-mt-sm">
                <q-input class="col-8" outlined v-model="healthFacilities" color="stepActive" readonly />
                <q-input class="col-3" outlined v-model="healthNumber" color="stepActive"
                  :rules="[val => (val && val.length > 0) || '']" />
              </div>
              <div class="row justify-between q-mt-sm">
                <q-input class="col-8" outlined v-model="worshipPlace" color="stepActive" readonly />
                <q-input class="col-3" outlined v-model="worshipNumber" color="stepActive"
                  :rules="[val => (val && val.length > 0) || '']" />
              </div>
            </q-step>

            <q-step :name="4" icon="fa-solid fa-4" :done="step > 4" class="q-px-lg">
              <p class="q-mb-none q-mt-sm" style="font-size: 18px; font-weight: bold;">Kebutuhan Obat</p>
              <!-- <q-icon class="q-mt-md" name="img:icons/dinamic-maps.png" style="width: 100%; height: 180px;" /> -->
              <p class="b1 q-mb-none q-mt-md">Kebutuhan Obat</p>

              <q-table
                  grid
                  title = ""
                  :rows = "medRow"
                  :columns = "medColumn"
                  row_key = "id"
                  separator = "cell">
                  
                  <template v-slot:item = "props">
                    <q-card class = "q-ma-none q-mt-sm q-ml-sm q-pa-none titleBGcolor" style="min-width: 300px; max-width:300px">
                      <div class = "q-ma-no q-pa-no" v-for="col in props.cols" :key="col.id">
                        <div class = "text-subtitle 1">
                          {{ col.label }}:{{ col.value }}
                        </div> 
                      </div>

                      <!-- <q-card-action>
                        <router-link :to="`/admin/evacuation/disaster-id/evacuation-id?disasterId=${props.row.disasterId}&locId=${props.row.id}`"> Edit </router-link>
                      </q-card-action>   -->
                    </q-card>
                  </template>
                </q-table>

                <div v-show="addMedicineFlag">
                    <q-list>
                        <!-- already filled by administrator -->
                        <q-item class="column q-pa-none">
                            <div class="row justify-between q-mt-md">
                                <p class="q-mb-none" style="font-size: 16px; font-weight: bold;">Nama Obat</p>
                            </div>
                            <q-input outlined v-model="medicineName" placeholder=""  />

                            <p class="q-mb-none q-mt-sm" style="font-size: 16px; font-weight: bold;">Kuantitas Obat</p>
                            <q-input outlined v-model="medicineNameQuantity" placeholder="" />
                        </q-item>
              
                    </q-list>
                </div>
                    <!-- need database -->
                    <div v-show = "!addMedicineFlag">
                    <q-btn class="q-mt-md q-px-sm" outline color="black" label="Tambahkan Obat" no-caps
                        style=" height: 12px;" @click="addMedicineFlag=true" />
                    </div>   
                    <div v-show = "addMedicineFlag">

                    <q-btn class="q-mt-md q-mb-lg"
                        style="background: #F97C21; width: 100%;height: 42px; border-radius: 10px; color: black"
                        label="Simpan"   @click="addMedicine()"/>
                    <q-btn class="q-mt-md q-mb-lg"
                        style="background: #F97C21; width: 100%;height: 42px; border-radius: 10px; color: black"
                        label="Batal"   @click="addMedicineFlag=false"/>
                    </div>
            </q-step> 

            <q-step :name="5" icon="fa-solid fa-5" :done="step > 5" class="q-px-lg">
              <p class="q-mb-none q-mt-sm" style="font-size: 18px; font-weight: bold;">Kebutuhan Pangan</p>
              <!-- <q-icon class="q-mt-md" name="img:icons/dinamic-maps.png" style="width: 100%; height: 180px;" /> -->
              <p class="b1 q-mb-none q-mt-md">Kebutuhan Pangan</p>

              <q-table
                  grid
                  title = ""
                  :rows = "foodsRow"
                  :columns = "foodsColumn"
                  row_key = "id"
                  separator = "cell">
                  
                  <template v-slot:item = "props">
                    <q-card class = "q-ma-none q-mt-sm q-ml-sm q-pa-none titleBGcolor" style="min-width: 300px; max-width:300px">
                      <div class = "q-ma-no q-pa-no" v-for="col in props.cols" :key="col.id">
                        <div class = "text-subtitle 1">
                          {{ col.label }}:{{ col.value }}
                        </div> 
                      </div>

                      <!-- <q-card-action>
                        <router-link :to="`/admin/evacuation/disaster-id/evacuation-id?disasterId=${props.row.disasterId}&locId=${props.row.id}`"> Edit </router-link>
                      </q-card-action>   -->
                    </q-card>
                  </template>
                </q-table>

                <div v-show="addFoodsFlag">
                    <q-list>
                        <!-- already filled by administrator -->
                        <q-item class="column q-pa-none">
                            <div class="row justify-between q-mt-md">
                                <p class="q-mb-none" style="font-size: 16px; font-weight: bold;">Nama Pangan</p>
                            </div>
                            <q-input outlined v-model="foodsName" placeholder=""  />

                            <p class="q-mb-none q-mt-sm" style="font-size: 16px; font-weight: bold;">Kuantitas Pangan</p>
                            <q-input outlined v-model="foodsNameQuantity" placeholder="" />
                        </q-item>
              
                    </q-list>
                </div>
                    <!-- need database -->
                    <div v-show = "!addFoodsFlag">
                    <q-btn class="q-mt-md q-px-sm" outline color="black" label="Tambahkan Pangan" no-caps
                        style=" height: 12px;" @click="addFoodsFlag=true" />
                    </div>   
                    <div v-show = "addFoodsFlag">

                    <q-btn class="q-mt-md q-mb-lg"
                        style="background: #F97C21; width: 100%;height: 42px; border-radius: 10px; color: black"
                        label="Simpan"   @click="addFoods()"/>
                    <q-btn class="q-mt-md q-mb-lg"
                        style="background: #F97C21; width: 100%;height: 42px; border-radius: 10px; color: black"
                        label="Batal"   @click="addFoodsFlag=false"/>
                    </div>
            </q-step>

            <q-step :name="6" icon="fa-solid fa-6" :done="step > 6" class="q-px-lg">
              <p class="q-mb-none q-mt-sm" style="font-size: 18px; font-weight: bold;">Kebutuhan Sandang</p>
              <!-- <q-icon class="q-mt-md" name="img:icons/dinamic-maps.png" style="width: 100%; height: 180px;" /> -->
              <p class="b1 q-mb-none q-mt-md">Kebutuhan Sandang</p>

              <q-table
                  grid
                  title = ""
                  :rows = "clothingRow"
                  :columns = "clothingColumn"
                  row_key = "id"
                  separator = "cell">
                  
                  <template v-slot:item = "props">
                    <q-card class = "q-ma-none q-mt-sm q-ml-sm q-pa-none titleBGcolor" style="min-width: 300px; max-width:300px">
                      <div class = "q-ma-no q-pa-no" v-for="col in props.cols" :key="col.id">
                        <div class = "text-subtitle 1">
                          {{ col.label }}:{{ col.value }}
                        </div> 
                      </div>

                      <!-- <q-card-action>
                        <router-link :to="`/admin/evacuation/disaster-id/evacuation-id?disasterId=${props.row.disasterId}&locId=${props.row.id}`"> Edit </router-link>
                      </q-card-action>   -->
                    </q-card>
                  </template>
                </q-table>

                <div v-show="addClothingFlag">
                    <q-list>
                        <!-- already filled by administrator -->
                        <q-item class="column q-pa-none">
                            <div class="row justify-between q-mt-md">
                                <p class="q-mb-none" style="font-size: 16px; font-weight: bold;">Nama Sandang</p>
                            </div>
                            <q-input outlined v-model="clothingName" placeholder=""/>

                            <p class="q-mb-none q-mt-sm" style="font-size: 16px; font-weight: bold;">Kuantitas Sandang</p>
                            <q-input outlined v-model="clothingNameQuantity" placeholder="" />
                        </q-item>
              
                    </q-list>
                </div>
                    <!-- need database -->
                    <div v-show = "!addClothingFlag">
                    <q-btn class="q-mt-md q-px-sm" outline color="black" label="Tambahkan Sandang" no-caps
                        style=" height: 12px;" @click="addClothingFlag=true" />
                    </div>   
                    <div v-show = "addClothingFlag">

                    <q-btn class="q-mt-md q-mb-lg"
                        style="background: #F97C21; width: 100%;height: 42px; border-radius: 10px; color: black"
                        label="Simpan"   @click="addClothing()"/>
                    <q-btn class="q-mt-md q-mb-lg"
                        style="background: #F97C21; width: 100%;height: 42px; border-radius: 10px; color: black"
                        label="Batal"   @click="addClothingFlag=false"/>
                    </div>
            </q-step>


            <template v-slot:navigation>
              <q-stepper-navigation class="q-mt-md">
                <q-btn v-if="step == 1" class="full-width poppins-r" text-color="black" no-caps
                  @click="$refs.stepper.next()" color="stepActive" :label="step == 6 ? 'Finish' : 'Continue'"
                  unelevated />

                <div class="row justify-between q-mt-md" v-if="step > 1">
                  <q-btn @click="$refs.stepper.previous()" text-color="black" label="Back" color="stepActive"
                    class="col-5 poppins-r bt-width" align="center" no-caps unelevated stretch />

                  <q-btn class="col-5 poppins-r bt-width" v-if="step > 1 && step < 6" text-color="black" no-caps
                    @click="$refs.stepper.next()" color="stepActive" :disable ="isSave === 0 && step ===3" :label="step === 6 ? 'Finish' : 'Continue'"
                    align="center" unelevated stretch />

                  <!-- <q-btn class="col-5 poppins-r bt-width" v-else text-color="black" no-caps color="stepActive"
                    label="submit" type="submit" align="center" unelevated stretch /> -->
                  <q-btn class="col-5 poppins-r bt-width" v-else text-color="black" no-caps color="stepActive"
                    label="submit"  @click="saveData"  align="center" unelevated stretch />

                  <q-btn v-if="step == 3" class="full-width poppins-r" text-color="black" no-caps
                    @click="saveData" color="red" :label="test"
                    unelevated />

                </div>
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </q-form>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import {api} from 'boot/axios'

function onSubmit(event) {
    event.target.submit()
  }

export default {
 //name: 'AdminEvacuationID',

  data() {
    return {

      isSave : 0, 
          
      // stepper 1
      disasterId:"",
      locId:"",
      evacName:"",
      alamat:"",
      kecamatan:"",
      rt:"",
      rw:"",
      namaPetugas:"",
      nomorPetugas:"",
      totalChild: "",
      totalAdults: "",
      totalEldery: "",
      totalPregnancy: "",

      // stepper 2
      totalDeathBody: "",
      totalMajorInjury: "",
      totalMinorInjury: "",
      totalLost: "",
      totalEvacuated: "",

      // stepper 3
      majorDamage: "Total Kerusakan Berat",
      majorNumber: "",
      mediumDamage: "Total Kerusakan Sedang",
      mediumNumber: "",
      minorDamage: "Total Kerusakan Ringan",
      minorNumber: "",
      Flooded: "Total Kebanjiran",
      floodedNumber: "",
      shcoolFacilities: "Sekolah",
      schoolNumber: "",
      healthFacilities: "Fasilitas Kesehatan",
      healthNumber: "",
      worshipPlace: "Tempat Ibadah",
      worshipNumber: "",

      // stepper 4 (Medicine)
      disasterId:"",
      locId:"",
      evacName:"",
      alamat:"",
      kecamatan:"",
      rt:"",
      rw:"",
      namaPetugas:"",
      nomorPetugas:"",
      medicineName: "",
      medicineNameQuantity: "",
      addMedicineFlag : false,
      medRow :[],
      medColumn :[
        { name: 'id',
          label: 'id',
          align: 'left',
          field: row => row.id
        },
        { name: 'Nama Obat',
          label: 'Nama Obat',
          align: 'left',
          field: row => row.medicineName
        },
        { name: 'Kuantitas Obat',
          label: 'Kuantitas Obat',
          align: 'left',
          field: row => row.medicineNameQuantity
        }
      ],

      // stepper 5 (Foods)
      disasterId:"",
      locId:"",
      evacName:"",
      alamat:"",
      kecamatan:"",
      rt:"",
      rw:"",
      namaPetugas:"",
      nomorPetugas:"",
      foodsName: "",
      foodsNameQuantity: "",
      addFoodsFlag : false,
      foodsRow :[],
      foodsColumn :[
        { name: 'id',
          label: 'id',
          align: 'left',
          field: row => row.id
        },
        { name: 'Nama Pangan',
          label: 'Nama Pangan',
          align: 'left',
          field: row => row.foodsName
        },
        { name: 'Kuantitas Pangan',
          label: 'Kuantitas Pangan',
          align: 'left',
          field: row => row.foodsNameQuantity
        }
      ],
      // stepper 6 (Clothing)
      disasterId:"",
      locId:"",
      evacName:"",
      alamat:"",
      kecamatan:"",
      rt:"",
      rw:"",
      namaPetugas:"",
      nomorPetugas:"",
      clothingName: "",
      clothingNameQuantity: "",
      addClothingFlag : false,
      clothingRow :[],
      clothingColumn :[
        { name: 'id',
          label: 'id',
          align: 'left',
          field: row => row.id
        },
        { name: 'Nama Sandang',
          label: 'Nama Sandang',
          align: 'left',
          field: row => row.clothingName
        },
        { name: 'Kuantitas Sandang',
          label: 'Kuantitas Sandang',
          align: 'left',
          field: row => row.clothingNameQuantity
        }
      ],


    }
  },
  // const :requiredRule = val => (val && val.length > 0) || 'Please type something',
  setup() {
    return {
      model: ref(0),
      step: ref(1),
      text: ref('')
    }
  },

  methods:{

      saveData(){
        console.log("saved data is called")
          this.addVictim()


        this.isSave = 1

     },
      async addVictim(){
        // this.disasterId= ""
        // this.locId=""
        // this.totalChild= ""
        // this.totalAdults=""
        // this.totalEldery=""
        // this.totalPregnancy=""
        // this.totalDeathBody=""
        // this.totalMajorInjury=""
        // this.totalMinorInjury=""
        // this.totalLost=""
        // this.totalEvacuated=""
        
        //console.log( this.evacVillage)
        const payload = {
          "disasterId": this.disasterId,
          "locId": this.locId,
          "evacName":this.evacName,
          "alamat":this.alamat,
          "kecamatan":this.kecamatan,
          "rt":this.rt,
          "rw":this.rw,
          "namaPetugas":this.namaPetugas,
          "nomorPetugas":this.nomorPetugas,
          "totalChild" : this.totalChild,
          "totalAdults" : this.totalAdults,
          "totalEldery" : this.totalEldery,
          "totalPregnancy" : this.totalPregnancy,
          "totalDeathBody" : this.totalDeathBody,
          "totalMajorInjury" : this.totalMajorInjury,
          "totalMinorInjury" : this.totalMinorInjury,
          "totalLost" : this.totalLost,
          "totalEvacuated" : this.totalEvacuated,
          "majorNumber":this.majorNumber,
          "mediumNumber":this.mediumNumber,
          "minorNumber":this.minorNumber,
          "floodedNumber":this.floodedNumber,
          "schoolNumber":this.schoolNumber,
          "healthNumber":this.healthNumber,
          "worshipNumber":this.worshipNumber
        }
        await api.post('/admin/addVictim', payload ).then((response)=>{ 
          console.log (response)
        }) 
        
        this.getVictimById()
      },

      // async getVictimById(){
        
      //   console.log('getVictimById - called' )
      //   this.evacLocRow = []
      //   const payload = {
      //     "disasterId" : this.disasterId,
      //     "locId" : this.locId,
      //   }
      //   await api.post('/admin/getVictimById', payload ).then((response)=>{
      //     console.log (response)
      //     this.evacLocRow =  response.data
      //     console.log(this.evacLocRow )
      //   }) 
      // },
      
      async addMedicine(){
        this.addMedicineFlag = false
        console.log ("addMedicineCalled")
        // this.evacLocName= ""
        // this.evacContactPerson=""
        // this.evacVillage= ""
        
        console.log( this.medicineName)
        const payload = {
          "disasterId":this.disasterId,
          "locId":this.locId,
          "evacName":this.evacName,
          "alamat":this.alamat,
          "kecamatan":this.kecamatan,
          "rt":this.rt,
          "rw":this.rw,
          "namaPetugas":this.namaPetugas,
          "nomorPetugas":this.nomorPetugas,
          // "medicineId":this.medicineId,
          "medicineName":this.medicineName,
          "medicineNameQuantity":this.medicineNameQuantity
        }
        await api.post('/admin/addMedicine', payload ).then((response)=>{
          console.log (response)
        }) 
        this.medicineName = ""
        this.medicineNameQuantity = ""
        this.getMedicineByLocationId()
      },

      async getMedicineByLocationId(){
        
        console.log('getMedicineByLocationId - called' )
        this.medRow = []
        const payload = {
          "locId" : this.locId,
        }
        await api.post('/admin/getMedicineByLocationId', payload ).then((response)=>{
          console.log (response)
          this.medRow =  response.data
          console.log(this.medRow )
        }) 
      },

      async addFoods(){
        this.addFoodsFlag = false
        console.log ("addFoodsCalled")
        // this.evacLocName= ""
        // this.evacContactPerson=""
        // this.evacVillage= ""
        
        console.log( this.foodsName)
        const payload = {
          "disasterId" : this.disasterId,
          "locId" : this.locId,
          "evacName":this.evacName,
          "alamat":this.alamat,
          "kecamatan":this.kecamatan,
          "rt":this.rt,
          "rw":this.rw,
          "namaPetugas":this.namaPetugas,
          "nomorPetugas":this.nomorPetugas,
          "foodsName" : this.foodsName,
          "foodsNameQuantity" : this.foodsNameQuantity
        }
        await api.post('/admin/addFoods', payload ).then((response)=>{
          console.log (response)
        }) 
        this.foodsName = ""
        this.foodsNameQuantity = ""
        this.getFoodsByLocationId()
      },

      async getFoodsByLocationId(){
        
        console.log('getFoodsByLocationId - called' )
        this.foodsRow = []
        const payload = {
          "locId" : this.locId,
        }
        await api.post('/admin/getFoodsByLocationId', payload ).then((response)=>{
          console.log (response)
          this.foodsRow =  response.data
          console.log(this.foodsRow)
        }) 
      },

      async addClothing(){
        this.addClothingFlag = false
        console.log ("addClothingCalled")
        // this.evacLocName= ""
        // this.evacContactPerson=""
        // this.evacVillage= ""
        
        console.log( this.clothingName)
        const payload = {
          "disasterId" : this.disasterId,
          "locId" : this.locId,
          "evacName":this.evacName,
          "alamat":this.alamat,
          "kecamatan":this.kecamatan,
          "rt":this.rt,
          "rw":this.rw,
          "namaPetugas":this.namaPetugas,
          "nomorPetugas":this.nomorPetugas,
          "clothingName" : this.clothingName,
          "clothingNameQuantity" : this.clothingNameQuantity
        }
        await api.post('/admin/addClothing', payload ).then((response)=>{
          console.log (response)
        }) 
        this.clothingName = ""
        this.clothingNameQuantity = ""
        this.getClothingByLocationId()
      },

      async getClothingByLocationId(){
        
        console.log('getClothingByLocationId - called' )
        this.clothingRow = []
        const payload = {
          "locId" : this.locId,
        }
        await api.post('/admin/getClothingByLocationId', payload ).then((response)=>{
          console.log (response)
          this.clothingRow =  response.data
          console.log(this.clothingRow)
        }) 
      },
    },

  mounted(){
    console.log("evacuationId test")

    console.log(this.$route.query)
    this.disasterId = this.$route.query.disasterId
    this.locId = this.$route.query.locId
    this.evacName = this.$route.query.evacName
    this.alamat = this.$route.query.alamat
    this.kecamatan = this.$route.query.kecamatan
    this.rt = this.$route.query.rt
    this.rw = this.$route.query.rw
    this.namaPetugas = this.$route.query.namaPetugas
    this.nomorPetugas = this.$route.query.nomorPetugas

    this.getMedicineByLocationId()
    this.getFoodsByLocationId()
    this.getClothingByLocationId()
  }
}
</script>

<style>
.text-stepActive {
  color: #F97C21 !important;
}

.bg-stepActive {
  background-color: #F97C21 !important;
}

.my-stepper .q-stepper__step-inner {
  padding: 0px;
  padding-top: 0px;
  padding-bottom: 8px;
}

.b1 {
  font-size: 14px;
  font-weight: bold;
}
</style>
