import csv


class orgnization:
    def __init__(self,data):
        self.disable = False
        self.data = data


    def get_data(self):
        return self.data

    def isDisabled(self):
        return self.disable

    def set_disable_true(self):
        self.disable = True



class database:

    def __init__(self):
        self.data_list = []
        with open('data.csv') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                single_data = orgnization(row)
                self.data_list.append(single_data)

    def get_raw_data(self):
        raw_data = []
        for single_data in self.data_list:
            if not single_data.isDisabled():
                raw_data.append(single_data.get_data())
        return raw_data


    def fileter_cato(self, col_list):
        current_data_list = self.data_list
        for single_data in current_data_list:
            isDisable = True
            for col_name in col_list:
                if single_data.get_data().get(col_name) == '1':
                    isDisable = False
            if isDisable:
                single_data.set_disable_true()

    def filter_col(self, col_name, col_value):
        current_data_list = self.data_list
        for single_data in current_data_list:
            if single_data.get_data().get(col_name) not in col_value:
                single_data.set_disable_true()


a = database()

a.filter_col('Cost',['Paid','Free'])
a.fileter_cato(['Legal', 'Finance'])

# print a.data_list
#
# for single_data in a.data_list:
#     status = single_data.isDisabled()
#     single_data = single_data.get_data()
#     print "*********************"
#     print 'Cost: ' + single_data.get('Cost')
#     print 'Legal: ' + single_data.get('Legal')
#     print 'Finance: ' + single_data.get('Finance')
#     print 'status: ' + str(status)
#
#
# #
# # for single_data in a.get_raw_data():
# #     print "*********************"
# #     print 'Cost: ' + single_data.get('Cost')
# #     print 'Legal: ' + single_data.get('Legal')
# #     print 'Finance: ' + single_data.get('Finance')
# #
# #
# #
# #
# #




