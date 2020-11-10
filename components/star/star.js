Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count: {
            type: Number,
            value:0,
            observer: '_countChangeHandle'
        },
        total: {
            type: Number,
            value:5
        },
        offset: {
            type: Number,
            value:15
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        list:[]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        starChange:function(e){
            console.log(e.currentTarget.dataset)
            var index = e.currentTarget.dataset.index;
            this.triggerEvent('change', e.currentTarget.dataset)
        },
        _countChangeHandle (newVal, oldVal, changedPath) {
            var list = [];
            var count = newVal;
            var total = this.properties.total;
            for(var i=0;i<total;i++){
                if(i+1>count){
                    list[i] = {
                        value:false
                    }
                }else{
                    list[i] = {
                        value:true
                    }
                }
            }
            this.setData({
                list:list
            })
        },
    },

    attached () {
        var list = [];
        var count = this.properties.count;
        var total = this.properties.total;
        for(var i=0;i<total;i++){
            if(i+1>count){
                list[i] = {
                    value:false
                }
            }else{
                list[i] = {
                    value:true
                }
            }
        }
        this.setData({
            list:list
        })
    }
})
