from django.http import JsonResponse
from django.db import connection # For raw SQL execution

def get_data(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Candidate WHERE IsDeleted = 0")
            # Get column names from cursor.description
            columns = [col[0] for col in cursor.description]
            # Fetch all rows and convert them to a list of dictionaries
            data = [
                dict(zip(columns, row))
                for row in cursor.fetchall()
            ]
        return JsonResponse(data, safe=False) # safe=False because we are returning a list
    except Exception as e:
        # Log the error e if logging is set up
        return JsonResponse({'error': str(e)}, status=500)
