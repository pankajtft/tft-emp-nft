export const TableHeader = ()=>{
    return(
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 item-center">
            <tr>
                <th scope="col" class="py-3 px-6 ">
                   Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Employee Code
                </th>
                <th scope="col" class="py-3 px-6">
                    Email
                </th>
                <th scope="col" class="py-3 px-6">
                    Project Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Designation
                </th>
                <th scope="col" class="py-3 px-6">
                    Project Start Date
                </th>
                <th scope="col" class="py-3 px-6">
                    Project End Date
                </th>
                <th scope="col" class="py-3 px-6 ">
                    Team Size
                </th>
                <th scope="col" class="py-3 px-6">
                   Skills
                </th>
                <th scope="col" class="py-3 px-6 ">
                    Status
                </th>
                <th scope="col" class="py-3 px-6 ">
                    Action
                </th>
            </tr>
        </thead>
    )
}